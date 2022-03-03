import { StylesProvider } from '@chakra-ui/react'
import React from 'react'
import Styles from '../styles/moreinfo.module.css'
import Classlist from '../src/teacherComponents/classlist/classlist'
import Teacherdashboard from '../src/teacherComponents/Teacherdashboard/teacherdashboard'
import Teachernavbar from '../src/teacherComponents/Teachernavbar/teachernavbar'

function Moreinfo() {
  return (
    <div className={Styles.container}>
        <div className={Styles.leftside}>
        <Classlist></Classlist>
        </div>

        <div className={Styles.rightside}>
        <Teachernavbar></Teachernavbar>
        <Teacherdashboard></Teacherdashboard>
        </div>
    </div>
  )
}

export default Moreinfo