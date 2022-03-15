import React, { useState } from "react";
import { useEffect } from "react";

import Navbar from "../src/studentcomponents/navbar";
import Styles from "../styles/finishedbooks.module.css";

// import { getIDToken } from "../src/lib/firebase/refresh-tokens";

function Finishedbooks({
  isNewMessage,
  studentName,
  studentId,
  getStudentName,
}) {
  const [completedBooks, setCompletedBooks] = useState([]);


  async function getCompletedBooks() {
    try {
      const response = await fetch(
        `https://bookwormsbackendpreview.herokuapp.com/completedbooks/${studentId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setCompletedBooks(data.payload);
    } catch (err) {
      console.log("error in getCompletedBooks", err);
    }
  }

  useEffect(() => {
    getCompletedBooks();
  }, []);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <div>
      {
        <Navbar
          isNewMessage={isNewMessage}
          studentName={studentName}
          getStudentName={getStudentName}
          studentId={studentId}
        />
      }
      <div className={Styles.container}>
        {completedBooks &&
          completedBooks.map((book, index) => {
            return (
              <div key={index} className={Styles.bookDiv}>
                <h4> {book.title} </h4>
                <div className={Styles.box}>
                  <img
                    src={book.cover}
                    alt=""
                    // width="350rem" height="350rem"
                  />

                  <p>Completed: {formatDate(book.date_completed)} </p>
                </div>
              </div>
            );
          })}

       
      </div>
    </div>
  );
}


export default Finishedbooks;
