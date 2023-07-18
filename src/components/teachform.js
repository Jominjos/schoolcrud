import React, { useState } from "react";
import '../styles/stuform.css'
import TeaRow from "./tearow";
export default function Teachform ({teachers={},setTeachers={}}){

const dvalue = 
    {id:'' ,
    name:"",
    teacher_id:'',
class:''}


   
const[ids, setids]=useState(1)



const [user , setuser] = useState(dvalue)
const[edit ,setedit]  =useState(false)

const[ euser , seteuser]=useState(dvalue)
function edituser(data){
    console.log(data);
    setedit(true)
    seteuser(data)
    
}




function eventHandle(event){
   
    let [name2 , value2]= [event.target.name , event.target.value];
    //console.log(name2 , value2);
   let val = {...user, [name2] :value2}
   //console.log(val);
   setuser(val)
}


function handleEditChange (event){
    let [name3 , value3] =[event.target.name , event.target.value];
    let wal = {...euser,[name3]:value3}
    seteuser(wal)
    console.log(wal);
    
}

function formreset (){
    setuser(dvalue)
}

function editcancel(){
    seteuser(dvalue)
    setedit(false)
}



function formSubmit(event){
    event.preventDefault();
    let ide = ids;
    setids(prev => prev + 1)
    
   let valu ={...user , id:ide}
   //console.log(valu);
   let newteachers =[...teachers] 
    newteachers.push(valu)
   
   console.log(newteachers);
   setTeachers(newteachers)
   setuser(dvalue)
   
   
   


}

function editsubmit(event){
    event.preventDefault()
    console.log(euser);
    let newteachers =[...teachers] 
    let newteachers1 = newteachers.map((d,i)=>{

        if(d.id == euser.id) return euser
        else return d
    })

    setTeachers(newteachers1)
   
    setedit(false)





}

function deluser(data) {
    let delid = data.id;
    //console.log(delid);
    let newteachers =[...teachers] 
    newteachers =newteachers.filter(d =>{
        if( d.id != delid )return true ;
        else return false;}
    )
    setTeachers(newteachers);
    setedit(false)
}

    return(
        <>

       { !edit ? 
       <>
        <h5 className="heading">ADD TEACHER</h5>
       <form className="stu-form" onSubmit={formSubmit} >
        <div className="mb-3">
            <div className="flex">
          <label  className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            required
           name="name"
            onChange={eventHandle}
            value={user.name}
          />
        </div>
        </div>
        <div className="mb-3">
        <div className="flex">
          <label  className="form-label">
            teacher id:
          </label>
          <input
            type="text"
            className="form-control"
            required
            onChange={eventHandle}
            name="teacher_id"
            value={user.teacher_id}
          />
         </div>
        </div>
        <div className="mb-3">
        <div className="flex">
          <label  className="form-label">
            Class:
          </label>
          <input
            type="text"
            className="form-control"
            required
            onChange={eventHandle}
            name="class"
            value={user.class}
          />
          </div>
        </div>
       <div>
       <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="reset" className="btn btn-danger" onClick={formreset}>
          Reset
        </button>


       </div>
       
      </form> 
      </>    :(
      <>
      <h4>EDIT TEACHER</h4>
      <form className="stu-ed-form" onSubmit={editsubmit}  id="form2">
      <div className="mb-3">
            <div className="flex">
          <label className="form-label">
            Name-
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleEditChange}
          value={euser.name}
          name="name"
          />
        </div>
        </div>
        <div className="mb-3">
            <div className="flex">
          <label className="form-label">
            teacher id-
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleEditChange}
          value={euser.teacher_id}
          name="teacher_id"
          />
        </div>
        </div>
        <div className="mb-3">
            <div className="flex">
          <label className="form-label">
            class-
          </label>
          <input
            type="number"
            max="12"
            className="form-control"
            onChange={handleEditChange}
          value={euser.class}
          name="class"
          />
        </div>
        </div>
        <div>
       <button type="submit" className="btn btn-danger">
          Save
        </button>
        <button type="reset" className="btn btn-primary" onClick={editcancel}>
          Cancel
        </button>


       </div>
      </form>
      </> )}
        



      <table className="table table-bordered " >
        <thead>
          <tr>
            <th>name</th>
            <th>teacher id</th>
            <th>class</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
        
              
              
              {
                teachers &&
               teachers.length > 0 &&
               teachers.map((item,i) => (
               
                <TeaRow key={item.id} item={item} deluser={deluser} edituser={edituser}/>


          
               
               
               
               
               ))
                   
                
                
            }

              
              
        </tbody>
      </table>
        </>
    )
}