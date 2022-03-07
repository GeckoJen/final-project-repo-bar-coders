import { useState, useEffect } from "react";
import styles from '../../../styles/studentstats.module.css'

function Individualstats({ studentSelected }) {
  const [weeklyData, setWeeklyData] = useState({});

  async function getStudentData(id) {
    const response = await fetch(
      `https://fourweekproject.herokuapp.com/teachers/student/${id}`
    );
    const data = await response.json();
    const readingCount = data.studentWeeklyReading[0].count;
    const studentName = data.studentWeeklyReading[0].name;
    const pagesData = data.studentWeeklyPages;
    const pagesDataArray = pagesData.map((entry) => Number(entry.pages));
    const pagesDataTotal = pagesDataArray.reduce((a, b) => a + b, 0);

    const minutesData = data.studentWeeklyMinutes;
    const minutesDataArray = minutesData.map((entry) => Number(entry.minutes));
    const minutesDataTotal = minutesDataArray.reduce((a, b) => a + b, 0);

    const finishedBooks = data.studentCompletedBooks;
    const finishedBooksArray = finishedBooks.map((entry) =>
      Number(entry.completed)
    );
    const finishedBooksTotal = finishedBooksArray.reduce((a, b) => a + b, 0);

    setWeeklyData({
      studentName: studentName,
      readingCount: readingCount,
      pagesData: pagesDataTotal,
      minutesData: minutesDataTotal,
      finishedBooks: finishedBooksTotal,
    });
  }

  useEffect(() => {
    if (studentSelected.isSelected === true) {
      getStudentData(studentSelected.id);
    }
  }, [studentSelected]);

  return (
    <div>
      {!studentSelected.isSelected && (
        <p>Select a student to see their individual stats</p>
      )}
      {studentSelected.isSelected && (
        <div className={styles.studentStats}>
          <h3>{weeklyData.studentName}&apos;s weekly stats</h3>
          <p>Times read: {weeklyData.readingCount}</p>
          <p>Pages read: {weeklyData.pagesData}</p>
          <p>Minutes read: {weeklyData.minutesData}</p>
          <p>Books finished: {weeklyData.finishedBooks}</p>
        </div>
      )}
    </div>
  );
}

export default Individualstats;
