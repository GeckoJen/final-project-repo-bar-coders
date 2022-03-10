import React, {useState, useEffect} from "react";
import Styles from "../../../styles/teacherdashboard.module.css";
import Timesread from "../Graphs/timesread";
import Pagesread from "../Graphs/pagesread";
import Booksfinished from "../Graphs/booksfinished";
import Minutesread from "../Graphs/minutesread";
import Link from "next/link";


function Teacherdashboard({ studentSelected, userObject }) {

  const fetchToken = userObject[0].getIDToken.id_token;

  const [pagesRead, setPagesRead] = useState([]);
  const [minutesRead, setMinutesRead] = useState([]);
  const [booksComplete, setBooksComplete] = useState([]);
  const [timesRead, setTimesRead] = useState([]);

  async function getClassData() {
    const response = await fetch(
      "https://fourweekproject.herokuapp.com/teachers/class",
      {
        headers: {
          authorization: `Bearer ${fetchToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const pagesData = data.pagesReadByClass;
    setPagesRead(pagesData.map((day) => day.pages));
    const minutesData = data.minutesReadByClass;
    setMinutesRead(minutesData.map((day) => day.minutes));
    const booksCompleteData = data.booksCompletedByClass;
    setBooksComplete(booksCompleteData.map((day) => day.completed));
    setTimesRead(data.barChartData);
  }

  async function getStudentData(id) {
    const response = await fetch(
      `https://fourweekproject.herokuapp.com/teachers/student/${id}`,
      {
        headers: {
          authorization: `Bearer ${fetchToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const pagesData = data.studentWeeklyPages;
    setPagesRead(pagesData.map((day) => day.pages));
    const minutesData = data.studentWeeklyMinutes;
    setMinutesRead(minutesData.map((day) => day.minutes));
    const booksData = data.studentCompletedBooks;
    setBooksComplete(booksData.map((day) => day.completed));
  
  }

  useEffect(() => {
    if (studentSelected.isSelected === false) {
      getClassData();
    } else {
      getStudentData(studentSelected.id);
    }
  }, [studentSelected]);

 

  return (
    <div className={Styles.teacherdashboard}>
      <div className={Styles.timesreadcontainer}>
        <Timesread
          studentSelected={studentSelected}
          // userObject={userObject}
          timesRead={timesRead}
        ></Timesread>
      </div>

      {/* <div className={Styles.bottomsection}> */}
      <div className={Styles.topcontainers}>
        <div className={Styles.pages}>
          <Pagesread
            // studentSelected={studentSelected}
            // userObject={userObject}
            pagesRead={pagesRead}
          ></Pagesread>
        </div>
        <div className={Styles.minutes}>
          <Minutesread
            // studentSelected={studentSelected}
            // userObject={userObject}
            minutesRead={minutesRead}
          ></Minutesread>
        </div>
      </div>

      <div className={Styles.bottomcontainers}>
        <div className={Styles.finished}>
          <Booksfinished
            // studentSelected={studentSelected}
            // userObject={userObject}
            booksComplete={booksComplete}
          ></Booksfinished>
        </div>

        <div className={Styles.buttonDiv}>
          <Link href="/teacherinfopage" passHref>
            <button className={Styles.button}>Click for more info</button>
          </Link>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Teacherdashboard;
