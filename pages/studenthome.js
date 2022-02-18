import Navbar from "../src/studentcomponents/navbar"
import ProgressBar from "../src/studentcomponents/progressbar"


export default function StudentHome({isNewMessage}) {
    return (
      <div>
        <Navbar isNewMessage={isNewMessage}></Navbar>
        <ProgressBar />
      </div>
    )
}