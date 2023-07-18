import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Stuform from './components/stuform';
import Teachform from './components/teachform';
import Dashboard from './components/dashboard';
import Footer from './components/footer';
import { useState } from 'react';
import React from 'react';
function App() {
  const[students, setstudents] = useState([])
  const[teachers, setTeachers] = useState([])
  return (
  
  <div id='body1'> 
  <Header/>
  <Dashboard students={students} teachers={teachers}/>
    <div id='container'>
      <div id='stu-con'>
      <Stuform setstudents={setstudents} students={students}/>
    
      

      </div>
      <div id='teach-con'>
        <Teachform setTeachers={setTeachers} teachers={teachers}/>
      </div>
    </div>
    {/* <Footer/> */}
</div>
  
  );
}

export default App;
