import { useEffect, useState } from "react";
import styles from "../../../styles/studentstats.module.css";

function IndividualSummaries({ studentSelected }) {
  const [summaries, setSummaries] = useState([]);



  async function getIndividualSummaries(id) {
    const response = await fetch(
      `https://bookwormsbackendpreview.herokuapp.com/teachers/student/summaries/${id}`,
      {
        headers: {

          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setSummaries(data.payload);
  }

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  useEffect(() => {
    getIndividualSummaries(studentSelected.id);
  }, [studentSelected]);

  return (
    <div className={styles.studentSummaries}>
      {!studentSelected.isSelected && (
        <div className={styles.defaultText}>
          <p>Select a student to see their individual summaries</p>
        </div>
      )}
      <div className={styles.summaries}>
        {summaries && (
          <h2>{studentSelected.studentName}&apos;s reading summaries</h2>
        )}
        {summaries &&
          summaries.map((entry, index) => {
            return (
              <div className={styles.summaryEntry} key={index}>
                <h3>
                  {entry.title}, {entry.author}
                </h3>
                <h4>
                  {formatDate(entry.date_created)}: {entry.number_pages} pages,{" "}
                  {entry.minutes_read} minutes
                </h4>

                <p>Summary: {entry.summary}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default IndividualSummaries;
