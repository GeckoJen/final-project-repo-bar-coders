import React from "react";
import Navbar from "../src/studentcomponents/navbar";
import Image from "next/image";
import rocketicon from "../images/rocketicon.png";
import styles from "../styles/messages.module.css";
import { useEffect, useState } from "react";
// import { getIDToken } from "../src/lib/firebase/refresh-tokens";

function Messages({
  isNewMessage,
  studentName,
  studentId,
  getStudentName,
}) {


  const [studentMessages, setStudentMessages] = useState([

  ]);
  const [classMessages, setClassMessages] = useState([
    
  ]);

  const [allMessages, setAllMessages] = useState();

  function getDateAsNumber(string) {
    let date = new Date(string);
    return date.valueOf();
  }

  const [teacherName, setTeacherName] = useState("Mrs Freeman");

  async function getMessages() {
    try {
      const response = await fetch(
        `https://bookwormsbackendpreview.herokuapp.com/feedback/${studentId}`,
        {
          headers: {
            
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setStudentMessages(data.studentFeedBack);
      setClassMessages(data.classFeedback);
      setTeacherName(data.studentFeedBack[0].teacher);
    } catch (err) {
      console.log("error in getMessages", err);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    setAllMessages(
      [...studentMessages, ...classMessages].sort(
        (a, b) => getDateAsNumber(b.date) - getDateAsNumber(a.date)
      )
    );
  }, [studentMessages, classMessages]);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <div>
      <Navbar
        isNewMessage={isNewMessage}
        studentName={studentName}
        getStudentName={getStudentName}
        studentId={studentId}
      />
      <div className={styles.pageBody}>
        <div className={styles.leftImage}>
          <Image src={rocketicon.src} alt="rocket" width="100" height="100" />
        </div>

        <div className={styles.container}>
          <h1>
            {studentName}, see the messages from {teacherName}{" "}
          </h1>

          {allMessages &&
            allMessages.map((message, index) => {
              return (
                <div key={index}>
                  <h5>{formatDate(message.date)}</h5>
                  <p>{message.feedback_text}</p>
                </div>
              );
            })}
        </div>
        <div className={styles.rightImage}>
          <Image src={rocketicon.src} alt="rocket" width="100" height="100" />
        </div>
      </div>
    </div>
  );
}



export default Messages;
