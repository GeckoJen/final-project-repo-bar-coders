import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import image from "../images/projeto-o-fn--TuQvBZ0-unsplash.jpg";
// import { getIDToken } from "../src/lib/firebase/refresh-tokens";
// import { auth } from "../src/lib/firebase/firebase-init";
// import { post } from "../src/lib/HTTP_Functions/POST";
import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";

function Home() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // // Auth checking credentials
  // async function signIn() {
  //   try {
  //     const res = await signInWithEmailAndPassword(auth, email, password);
  //     const refreshToken = res.user.refreshToken;
  //     await post("/api/auth", { refreshToken });
  //     if (res.user.uid === teacherId) {
  //       window.location.href = "/teacherhome";
  //     } else {
  //       window.location.href = "/studenthome";
  //     }
  //   } catch (error) {}
  // }

  return (
    <div className={styles.loginPage}>
      <div className={styles.image}>
        <Image
          // src="https://images.unsplash.com/photo-1635648116223-bce260c0dc1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          src={image.src}
          alt="space"
          width={600}
          height={750}
        />
      </div>
      <div className={styles.rightSide}>
        <h1>Book Worms</h1>

        <h3>
          This is a preview version of the Book Worms site. No usernames or
          passwords are required to enter and have a look around, but you will
          not be able to add new data to the database.
        </h3>
        <h3>
          Select either &apos;student&apos; or &apos;teacher&apos; below to see the different parts
          of the site.
        </h3>

        <div className={styles.Buttons}>
          <Link href="/studenthome" passHref>
            <button>Student</button>
          </Link>
          <Link href="/teacherhome" passHref>
            <button>Teacher</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
