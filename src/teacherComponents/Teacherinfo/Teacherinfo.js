import React, { useEffect, useState } from "react";
import Styles from "../../../styles/teacherinfo.module.css";
import Individualstats from "../Individualstats/individualstats";
import IndividualSummaries from "../IndividualSummaries/individualsummaries";

function Teacherinfo({
  studentSelected,

  moreThanFour,
  lessThanFour,
}) {
  //to send a new message:
  const [message, setMessage] = useState("");


  async function handleSubmit(event) {
    event.preventDefault();
alert("This feature is not available in the preview site")
    // if (studentSelected.isSelected === false) {
    //   try {
    //     const url =
    //       "https://bookwormsbackendpreview.herokuapp.com/teachers/class/feedback";

    //     await fetch(url, {
    //       method: "POST",
    //       headers: {
        
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         feedbackText: message,
    //         teacherId: userId,
    //       }),
    //     });

    //     console.log({
    //       feedbackText: message,
    //       teacherId: userId,
    //       url,
    //     });
    //   } catch (err) {
    //     console.log("error in handleSubmit", err);
    //   }
    // } else {
    //   try {
    //     const url =
    //       "https://bookwormsbackendpreview.herokuapp.com/teachers/student/feedback";

    //     await fetch(url, {
    //       method: "POST",
    //       headers: {
    //         authorization: `Bearer ${fetchToken}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         feedback_text: message,
    //         student_id: studentSelected.id,
    //       }),
    //     });

    //     console.log({
    //       feedback_text: message,
    //       student_id: studentSelected.id,
    //       url,
    //     });
    //   } catch (err) {
    //     console.log("error in handleSubmit", err);
    //   }
    // }
    setMessage("");
  }

  //to retrieve previously sent messages:
  const [sentMessages, setSentMessages] = useState([]);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  async function fetchMessages() {
    if (studentSelected.isSelected === false) {
      try {
        const url = `https://bookwormsbackendpreview.herokuapp.com/teachers/class/feedback/${userId}`;

        const response = await fetch(url, {
          headers: {
 
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setSentMessages(data.payload);
      } catch (err) {
        console.log("error in fetchMessages", err);
      }
    } else {
      try {
        const url = `https://bookwormsbackendpreview.herokuapp.com/teachers/student/feedback/${studentSelected.id}`;

        const response = await fetch(url, {
          headers: {

            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setSentMessages(data.payload);
      } catch (err) {
        console.log("error in fetchMessages", err);
      }
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [studentSelected, message]);

  return (
    <div className={Styles.teacherinfo}>
      <div className={Styles.topcontainers}>
        <div className={Styles.topleft}>
          <Individualstats
            studentSelected={studentSelected}
            className={Styles.p1}
      
            moreThanFour={moreThanFour}
            lessThanFour={lessThanFour}
          ></Individualstats>
        </div>
        <div className={Styles.topright}>
          {!studentSelected.isSelected && (
            <h3 className={Styles.p2}> Send a message to the whole class </h3>
          )}
          {studentSelected.isSelected && (
            <h3 className={Styles.p2}>
              {" "}
              Send a message to {studentSelected.studentName}{" "}
            </h3>
          )}
          <input
            className={Styles.input}
            type="text"
            placeholder="Type message here ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button className={Styles.button} onClick={handleSubmit}>
            {" "}
            Send{" "}
          </button>
        </div>
      </div>

      <div className={Styles.bottomcontainers}>
        <div className={Styles.btmleft}>
          <IndividualSummaries
            studentSelected={studentSelected}
            className={Styles.p3}

          ></IndividualSummaries>
        </div>

        <div className={Styles.btmright}>
          <h3 className={Styles.p4}> Message Log </h3>
          {sentMessages.map((message, index) => {
            return (
              <div className={Styles.p5} key={index}>
                <h4>{formatDate(message.date)}</h4>
                <p>{message.feedback_text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Teacherinfo;
