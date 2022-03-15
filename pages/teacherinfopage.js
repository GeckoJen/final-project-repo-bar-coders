import React, { useEffect } from "react";
import Styles from "../styles/teacherhome.module.css";
import Classlist from "../src/teacherComponents/classlist/classlist";
import Teachernavbar from "../src/teacherComponents/Teachernavbar/teachernavbar";
import Teacherinfo from "../src/teacherComponents/Teacherinfo/Teacherinfo";

// import { getIDToken } from "../src/lib/firebase/refresh-tokens";


function Teacherinfopage({
  lessThanFour,
  moreThanFour,
  changeStudentSelected,
  studentSelected,
  
  getClassList,
}) {
  

  useEffect(() => {
    getClassList();
    console.log("4+:", moreThanFour, "4-:", lessThanFour);
  }, []);
  return (
    <div className={Styles.container}>
      <div className={Styles.leftside}>
        <Classlist
          lessThanFour={lessThanFour}
          moreThanFour={moreThanFour}
          changeStudentSelected={changeStudentSelected}
          studentSelected={studentSelected}
       
        ></Classlist>
      </div>

      <div className={Styles.rightside}>
        <Teachernavbar></Teachernavbar>
        <Teacherinfo
          studentSelected={studentSelected}
     
          moreThanFour={moreThanFour}
          lessThanFour={lessThanFour}
        ></Teacherinfo>
      </div>
      <div></div>
    </div>
  );
}


export default Teacherinfopage;
