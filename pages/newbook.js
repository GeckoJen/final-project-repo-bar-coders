import React, {useState} from 'react'
import Navbar from '../src/studentcomponents/navbar'
import Image from 'next/image'
import rocketicon from '../images/rocketicon.png'
import styles from '../styles/newbook.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Newbook({ isNewMessage, studentId }) {

  const router = useRouter();

  const [newApiBook, setNewApiBook] = useState()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  async function bookSearch() {
    setErrorMessage("")
    setNewApiBook()
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${title}&author=${author}` //update to reflect search terms
      );
      const data = await response.json();

      console.log(data.docs[0]);
      console.log(data.docs[0].author_name[0]);
      console.log(data.docs[0].title);
      console.log(data.docs[0].number_of_pages_median);
      console.log(data.docs[0].cover_edition_key); //use to fetch cover art
      console.log(data.docs[0].isbn[0]) //book id to be added to database

      setNewApiBook({
        title: data.docs[0].title,
        author: data.docs[0].author_name[0],
        total_pages: data.docs[0].number_of_pages_median,
        cover: `https://covers.openlibrary.org/b/olid/${data.docs[0].cover_edition_key}-L.jpg`,
        bookId: data.docs[0].isbn[0],
        studentId: studentId,
        
      });
    }
    catch { setErrorMessage("No matches found. Did you fill in all the details and spell everything correctly?") }
  }


  
  async function addBookToDatabase() {
    const url = ""; //add API route to post new book into database
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newApiBook) //check format of newApiBook matches database requirements
    })
    router.push('/studenthome')
  }

  return (
    <div>
      <Navbar isNewMessage={isNewMessage} />
      <div className={styles.pageBody}>
        <div className={styles.leftImage}>
          <Image src={rocketicon.src} alt="rocket" width="100" height="100" />
        </div>

        <div className={styles.container}>
          <h1>Search for a new book</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Book title"
          ></input>
          <input
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            placeholder="Author"
          ></input>
          <button onClick={bookSearch}>Search</button>

          {newApiBook && (
            <div>
              <p>Is this your book?</p>
              <h3>{newApiBook.title}</h3>
              <p>by {newApiBook.author}</p>
              <div className={styles.buttonDiv}>
                <button onClick={addBookToDatabase}>Yes, this is my book</button>
                <Link href="/cantfindbook" passHref>
                  <button>No, let me add the details myself</button>
                </Link>
              </div>
            </div>
          )}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <div className={styles.rightImage}>
          <Image src={rocketicon.src} alt="rocket" width="100" height="100" />
        </div>
      </div>
    </div>
  );
}

export default Newbook