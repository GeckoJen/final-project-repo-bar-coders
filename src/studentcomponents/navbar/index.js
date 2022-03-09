import React from "react";
import styles from "../../../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import bookwormicon from "../../../images/bookwormicon.png";
import newmessageicon from "../../../images/newmessageicon.png";
import messagesicon from "../../../images/messagesicon.png";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase-init";
import { post } from "../../lib/HTTP_Functions/POST";
import { useEffect } from "react";

function Navbar({ isNewMessage, studentName, userObject, getStudentName }) {
      async function logOut() {
            // await auth.signOut()
            await signOut(auth);
            await post("/api/signOut");
            window.location.href = "/";
      }

      const userId = userObject[0].getIDToken.user_id;
      const fetchToken = userObject[0].getIDToken.id_token;

      useEffect(() => {
            getStudentName(userId, fetchToken);
      }, []);

      return (
            <div>
                  <div className={styles.navbar}>
                        <div className={styles.student}>
                              {/* <img src="https://cdn-icons-png.flaticon.com/512/2490/2490295.png"></img> */}
                              <Image
                                    src={bookwormicon.src}
                                    alt="icon"
                                    width="60px"
                                    height="60px"
                              />
                              <h1>{studentName}</h1>
                        </div>

                        <Link href="/studenthome" passHref>
                              <button>Home</button>
                        </Link>
                        <Link href="/dictionary" passHref>
                              <button>Dictionary</button>
                        </Link>
                        <Link href="/finishedbooks" passHref>
                              <button>Finished Books</button>
                        </Link>

                        {isNewMessage && (
                              /* <img src="https://cdn-icons-png.flaticon.com/512/6875/6875112.png"></img> */
                              <Link href="/messages" passHref>
                                    <Image
                                          src={newmessageicon.src}
                                          alt="icon"
                                          width="60px"
                                          height="60px"
                                    />
                              </Link>
                        )}
                        {!isNewMessage && (
                              /* <img src="https://cdn-icons-png.flaticon.com/512/6875/6875170.png"></img> */
                              <Link href="/messages" passHref>
                                    <Image
                                          src={messagesicon.src}
                                          alt="icon"
                                          width="60px"
                                          height="60px"
                                    />
                              </Link>
                        )}
                        <Link href="/" passHref>
                              <button
                                    className={styles.logoutbutton}
                                    onClick={logOut}
                              >
                                    Log Out
                              </button>
                        </Link>
                  </div>
                  <div className={styles.mobileNavbar}>
                        <div className={styles.menubar}>
                              <div className={styles.student}>
                                    <Image
                                          src={bookwormicon.src}
                                          alt="icon"
                                          width="60px"
                                          height="60px"
                                    />
                                    <h1>{studentName}</h1>
                              </div>
                              <button className={styles.dropbtn}>Menu</button>
                        </div>
                        <div className={styles.dropdownContent}>
                              <Link href="/studenthome" passHref>
                                    <p>Home</p>
                              </Link>
                              <Link href="/dictionary" passHref>
                                    <p>Dictionary</p>
                              </Link>
                              <Link href="/finishedbooks" passHref>
                                    <p>Finished books</p>
                              </Link>
                              <Link href="/messages" passHref>
                                    <p>Messages</p>
                              </Link>
                              <Link href="/" passHref>
                                    <p onClick={logOut}>Log out</p>
                              </Link>
                        </div>
                  </div>
            </div>
      );
}

export default Navbar;
