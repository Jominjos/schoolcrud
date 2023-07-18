import React from "react";
import '../styles/dashboard.css'

export default function Dashboard({students={},teachers={}}){
    let stud = students.length
    let teach = teachers.length
    return(
        <>
        <div className="dash">
        
        <h4>  Students{`: `}{ stud} </h4>
        <h4> Teachers{`: `}{teach} </h4>

        </div>
        
        
        </>
    )
}