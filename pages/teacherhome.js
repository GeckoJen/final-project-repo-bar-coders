import React, { useEffect } from "react";
import Styles from "../styles/teacherhome.module.css";
import Classlist from "../src/teacherComponents/classlist/classlist";
import Teacherdashboard from "../src/teacherComponents/Teacherdashboard/teacherdashboard";
import Teachernavbar from "../src/teacherComponents/Teachernavbar/teachernavbar";
// import { getIDToken } from "../src/lib/firebase/refresh-tokens";
// import { Bar } from "react-chartjs-2";

function Teacherhome({
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
        />
      </div>

      <div className={Styles.rightside}>
        <Teachernavbar></Teachernavbar>
        <Teacherdashboard
          changeStudentSelected={changeStudentSelected}
          studentSelected={studentSelected}
        
        ></Teacherdashboard>
      </div>
      <div></div>
    </div>
  );
}


export default Teacherhome;
