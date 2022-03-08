import React from "react";
import Navbar from "../src/studentcomponents/navbar";
import ProgressBar from "../src/studentcomponents/progressbar";
import Readinglog from "../src/studentcomponents/readinglog";
import styles from "../styles/readinglogpage.module.css";
import Image from "next/image";
import Link from "next/link";
import BookProgressBar from "../src/studentcomponents/bookprogressbar";
import { getIDToken } from "../src/lib/firebase/refresh-tokens";

function readinglog({
  isNewMessage,
  studentDaysRead,
  currentBook,
  studentId,
  studentName,
}) {
  return (
    <div className={styles.wholePage}>
      <div className={styles.headerSection}>
        <Navbar isNewMessage={isNewMessage} studentName={studentName} />
        <ProgressBar studentDaysRead={studentDaysRead} />
      </div>
      <div className={styles.pageBody}>
        <div className={styles.leftSide}>
          <img
            src={currentBook.cover}
            alt={currentBook.title}
            width="310"
            height="500"
          />
          <BookProgressBar currentBook={currentBook} />
          <Link href="/studenthome">
            <button className={styles.chooseAgainButton}>
              Choose a different book
            </button>
          </Link>
        </div>
        <div className={styles.rightSide}>
          <Readinglog currentBook={currentBook} studentId={studentId} />
        </div>
      </div>
    </div>
  );
}

// Adding Authentication to this page by checking for valid token
export async function getServerSideProps({ req, res }) {
  try {
    // This is the cookie
    const cookie = req.cookies.token;
    // This refreshes the id token
    const token = awaitgetIDToken(cookie);
    const isStudent = true;

    if (!tokengetIDToken.user_id) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        userObject: [],
      },
    };
  } catch (err) {
    console.log("THIS ERR WAS:", err);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default readinglog;
