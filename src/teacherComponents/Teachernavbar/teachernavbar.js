import React from "react";
import Styles from "../../../styles/teachernavbar.module.css";
import Link from "next/link";


function Teachernavbar() {
  

  return (
    <div className={Styles.teachernavbar}>
      <div className={Styles.leftside}>
        <h1> Welcome, Mrs Freeman </h1>
      </div>

      <div className={Styles.rightside}>
        <Link href="/teacherhome" passHref>
          <button className={Styles.home}> Dashboard </button>
        </Link>
        <Link href="/teacherinfopage" passHref>
          <button className={Styles.moreinfo}> More info </button>
        </Link>

        <Link href="/" passHref>
          <button className={Styles.logout} >
            {" "}
            Log out{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Teachernavbar;

{
  /* <Link href="/newbook" passHref>
            <button className={styles.newBookButton}>
              Want to add a book to your library?
            </button> */
}
