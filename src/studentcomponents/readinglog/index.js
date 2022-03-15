import { Link, useState } from "react";
import styles from "../../../styles/readinglog.module.css";
import { useRouter } from "next/router";
import ConfettiExplosion from "react-confetti-explosion";

function Readinglog({ currentBook}) {
  const router = useRouter();

  const [startPage, setStartPage] = useState();
  const [endPage, setEndPage] = useState();
  const [minutes, setMinutes] = useState();
  const [summary, setSummary] = useState();
  const [isComplete, setIsComplete] = useState(false);
  const [isExploding, setIsExploding] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();
    alert("This feature is not available on the preview site")
    setIsExploding(true);
    setTimeout(function () {
        router.push("/studenthome");
      }, 1500);

    // try {
    //   const url = "https://bookwormsbackendpreview.herokuapp.com/summaries";

    //   await fetch(url, {
    //     method: "POST",
    //     headers: {
        
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       bookId: currentBook.id,
    //       studentId: studentId,
    //       currentPage: endPage,
    //       summary: summary,
    //       isComplete: isComplete,
    //       minutesRead: minutes,
    //       pagesRead: endPage - startPage,
    //     }),
    //   });
    //   console.log({
    //     bookId: currentBook.id,
    //     studentId: studentId,
    //     currentPage: endPage,
    //     summary: summary,
    //     iscomplete: isComplete,
    //     minutesRead: minutes,
    //     pagesRead: endPage - startPage,
    //     url,
    //   });
    //   if (isComplete === true) {
    //     setIsExploding(true);
    //   }
    // } catch (err) {
    //   console.log("error in handleSubmit", err);
    // } finally {
    //   setTimeout(function () {
    //     router.push("/studenthome");
    //   }, 1500);
    // }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>{currentBook.title}</h1>
        {isExploding && (
          <ConfettiExplosion
            style={{
              force: 2,
              duration: 5000,
              particleCount: 1000,
              floorHeight: 1600,
              floorWidth: 1600,
            }}
          />
        )}
        <div className={styles.pageDiv}>
          <input
            type="text"
            value={startPage}
            onChange={(e) => setStartPage(e.target.value)}
            placeholder="What page did you start on?"
            required
          ></input>

          <input
            type="text"
            value={endPage}
            onChange={(e) => setEndPage(e.target.value)}
            placeholder="What page did you finish on?"
            required
          ></input>
        </div>

        <input
          type="text"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="How many minutes did you read for?"
          required
        ></input>

        <textarea
          rows="4"
          cols="50"
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summarise today's reading in one or two sentences"
          className={styles.summary}
          required
        ></textarea>

        <div className={styles.buttons}>
          {/* <Link href="studenthome" passHref> */}

          <button type="submit">Submit</button>

          {/* </Link> */}
          <label>
            Finished the book?
            <input
              value={isComplete}
              onClick={() => {
                setIsComplete(!isComplete);
              }}
              type="checkbox"
            ></input>
          </label>
        </div>
      </form>
    </div>
  );
}

export default Readinglog;
