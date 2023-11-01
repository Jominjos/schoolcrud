// hi
import "./App.css";
import axios from "axios";
import Header from "./components/header";
import Stuform from "./components/stuform";
//import Teachform from "./components/teachform";
import Dashboard from "./components/dashboard";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
import React from "react";
function App() {
  const [students, setstudents] = useState([]);
  // const [teachers, setTeachers] = useState([]);
  const [dbChange, setDbchange] = useState(true);
  console.log(dbChange);
  useEffect(() => {
    axios.get("https://scool-swart.vercel.app/api/students").then((d) => {
      //console.log(d.data.data);
      setstudents(d.data.data);
    });
  }, [dbChange]);

  return (
    <div id="body1">
      <Header />
      <Dashboard students={students} />
      <div id="container">
        <div id="stu-con">
          <Stuform
            setstudents={setstudents}
            students={students}
            setDbchange={setDbchange}
          />
        </div>
        {/* <div id="teach-con">
          <Teachform setTeachers={setTeachers} teachers={teachers} />
        </div> */}
      </div>
      {<Footer />}
    </div>
  );
}

export default App;
