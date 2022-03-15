import "../styles/globals.css";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  // teacherID
  const [teacherId, setTeacherId] = useState("3uXBvDCLEKR120deKJBcZzeRyGl1");

  //studentId - to be set via Auth?
    const [studentId, setStudentId] = useState("s10");

  //studentname - to be set Via fetch

  const [studentName, setStudentName] = useState("");

  //Added in case we use it as a stretch goal - notification if a "new" message is received
  const [isNewMessage, setIsNewMessage] = useState(true);

  // Used in the progress bar - need to work out how many days the student has read this week. Function to fetch data from database and calculate this needs to be written still
  const [studentDaysRead, setStudentDaysRead] = useState(3);

  //used in studenthome to match coins earned
  const [minutesRead, setMinutesRead] = useState(45);

  //Used in teacherhome to populate classlist - array of students who have read less than four times
  const [lessThanFour, setLessThanFour] = useState([
    {
      weekly: 10,
      count: "1",
      name: "Juan",
      student_id: "s03",
    },
    {
      weekly: 10,
      count: "1",
      name: "Bob",
      student_id: "s03",
    },
    {
      weekly: 10,
      count: "1",
      name: "Daisy",
      student_id: "s03",
    },
  ]);

  //Used in teacherhome to populate classlist - array of students who have read four times or more
  const [moreThanFour, setMoreThanFour] = useState([
    {
      weekly: 10,
      count: "5",
      name: "Alice",
      student_id: "s01",
    },
    {
      weekly: 10,
      count: "5",
      name: "Ryan",
      student_id: "s01",
    },
    {
      weekly: 10,
      count: "5",
      name: "Samantha",
      student_id: "s01",
    },
  ]);

  // get user info

  // async function getUser(token, user) {
  //   console.log("OOOOOOOOOOO", token);
  //   console.log("OOOOOOOOOOO", user);
  // }

  async function getClassList() {
    const response = await fetch(
      "https://bookwormsbackendpreview.herokuapp.com/teachers/class",
      {
        headers: {
         
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMoreThanFour(data.classList4TimesOrMore);
    setLessThanFour(data.classListLessThan4Times);
    //  console.log(moreThanFour, lessThanFour)
  }

  const [studentSelected, setStudentSelected] = useState({
    isSelected: false,
    id: null,
    studentName: null,
  });

  function changeStudentSelected(isSelected, id, name) {
    setStudentSelected({
      isSelected: isSelected,
      id: id,
      studentName: name,
    });
  }

  //Used in the book carousel (& other places?) Need to write fetch request to get data from database. Initial state is just an example to check code works
  const [inProgressBooks, setInProgressBooks] = useState([
    {
      id: 2,
      title: "Matilda",
      current_page: 146,
      total_pages: 223,
      percentagecomplete: 65,
      cover: "https://covers.openlibrary.org/b/isbn/014034294X.jpg",
    },
    {
      id: 3,
      title: "Artemis Fowl",
      current_page: 98,
      total_pages: 280,
      percentagecomplete: 35,
      cover:
        "https://www.artemis-fowl.com/wp-content/uploads/2019/03/2019-artemis-fowl-cover-book-one.jpg",
    },
    {
      id: 4,
      title: "Unknown Book",
      current_page: 1,
      total_pages: 150,
      percentagecomplete: 0,
      cover: "https://www.wallpaperuse.com/wallp/42-425257_m.jpg",
    },
  ]);

  //Current book that is being updated in the reading log:
  const [currentBook, setCurrentBook] = useState({
    id: 2,
    title: "Matilda",
    current_page: 145,
    total_pages: 223,
    percentagecomplete: 65,
    cover: "https://covers.openlibrary.org/b/isbn/014034294X.jpg",
  });

  //function to update current book depending on what is clicked in the book carousel:
  function updateCurrentBook(bookId) {
    let selectedBook = inProgressBooks.find((book) => {
      return book.id == bookId;
    });
    setCurrentBook(selectedBook);
  }

  //Used in dictionary - new word list
  const [words, setWords] = useState(["facilitate", "diminish", "gravitate"]);

  async function getWords(userId) {
    try {
      const response = await fetch(
        `https://bookwormsbackendpreview.herokuapp.com/dictionary/${userId}`,
        {
          headers: {
            
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      let wordArray = data.payload;
      let array = wordArray.map((entry) => {
        return entry.word;
      });
      setWords(array);
    } catch (err) {
      console.log("error in getWords", err);
    }
  }

  //function to fetch studentName

  async function getStudentData(userId) {
    try {
      console.log("test");
      const response = await fetch(
        `https://bookwormsbackendpreview.herokuapp.com/books/${userId}`,
        {
          headers: {
            
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.progressData.length > 0) {
        setStudentDaysRead(data.progressData[0].count);
        setMinutesRead(data.progressData[0].minutes_total);
      }
      if (data.bookData.length > 0) {
        setInProgressBooks(data.bookData);
      }
    } catch (err) {
      console.log("error within getStudentData", err);
    }
  }

  async function getStudentName(userId) {
    try {
      const response = await fetch(
        `https://bookwormsbackendpreview.herokuapp.com/books/${userId}`,
        {
          headers: {
          
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setStudentName(data.name[0].name);
    } catch (err) {
      console.log("error in getStudentName", err);
    }
  }

  // useEffect(() => {
  //       getStudentName();
  // }, []);

  //adds new words to dictionary word list
  async function updateWordsList(newWord, meaning, userId) {
alert("This feature is not available in the preview site")
    // try {
    //   const url = "https://bookwormsbackendpreview.herokuapp.com/dictionary";
    //   await fetch(url, {
    //     method: "POST",
    //     headers: {
          
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       studentId: userId,
    //       word: newWord,
    //       definition: meaning,
    //     }),
    //   });
    // } catch (err) {
    //   console.log("error in updateWordsList", err);
    // }
  }

  // if(studentView){
  //   return <Component/>>   setup for Student, home and teacher to part out Chakra
  // }

  return (
    <Component
      {...pageProps}
      teacherId={teacherId}
      studentId={studentId}
      studentName={studentName}
      isNewMessage={isNewMessage}
      studentDaysRead={studentDaysRead}
      inProgressBooks={inProgressBooks}
      currentBook={currentBook}
      updateCurrentBook={updateCurrentBook}
      words={words}
      updateWordsList={updateWordsList}
      getWords={getWords}
      minutesRead={minutesRead}
      getStudentData={getStudentData}
      lessThanFour={lessThanFour}
      moreThanFour={moreThanFour}
      studentSelected={studentSelected}
      changeStudentSelected={changeStudentSelected}
      getStudentName={getStudentName}
      getClassList={getClassList}
    />
  );
}

export default MyApp;
