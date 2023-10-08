import React, { useState } from "react";
import "../styles/stuform.css";
import Row from "./trow";
export default function Stuform({ students = {}, setstudents = {} }) {
  const dvalue = { id: "", name: "", student_id: "", class: "" };

  const [ids, setids] = useState(1);

  const [user, setuser] = useState(dvalue);
  const [edit, setedit] = useState(false);

  const [euser, seteuser] = useState(dvalue);
  function edituser(data) {
    // console.log(data);
    setedit(true);
    seteuser(data);
  }

  function eventHandle(event) {
    let [name2, value2] = [event.target.name, event.target.value];
    //console.log(name2 , value2);
    let val = { ...user, [name2]: value2 };
    //console.log(val);
    setuser(val);
  }

  function handleEditChange(event) {
    let [name3, value3] = [event.target.name, event.target.value];
    let wal = { ...euser, [name3]: value3 };
    seteuser(wal);
    //console.log(wal);
  }

  function formreset() {
    setuser(dvalue);
  }

  function editcancel() {
    seteuser(dvalue);
    setedit(false);
  }

  function formSubmit(event) {
    event.preventDefault();
    let ide = ids;
    setids((prev) => prev + 1);

    let valu = { ...user, id: ide };
    //console.log(valu);
    let newstudents = [...students];
    newstudents.push(valu);

    //console.log(newstudents);
    setstudents(newstudents);
    setuser(dvalue);
  }

  function editsubmit(event) {
    event.preventDefault();
    //console.log(euser);
    let newstudents = [...students];
    let newstudents1 = newstudents.map((d, i) => {
      if (d.id === euser.id) return euser;
      else return d;
    });

    setstudents(newstudents1);

    setedit(false);
  }

  function deluser(data) {
    let delid = data.id;
    //console.log(delid);
    let newstudents = [...students];
    newstudents = newstudents.filter((d) => {
      if (d.id !== delid) return true;
      else return false;
    });
    setstudents(newstudents);
    setedit(false);
  }

  return (
    <>
      {!edit ? (
        <>
          <h5 className="heading">ADD STUDENT</h5>
          <form className="stu-form" onSubmit={formSubmit}>
            <div className="mb-3">
              <div className="flex">
                <label className="form-label">Name:</label>
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
                <label className="form-label">student id:</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={eventHandle}
                  name="student_id"
                  value={user.student_id}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex">
                <label className="form-label">Class:</label>
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
              <button
                type="reset"
                className="btn btn-danger"
                onClick={formreset}
              >
                Reset
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h4 className="heading">EDIT STUDENT</h4>
          <form className="stu-ed-form" onSubmit={editsubmit} id="form2">
            <div className="mb-3">
              <div className="flex">
                <label className="form-label">Name-</label>
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
                <label className="form-label">student id-</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleEditChange}
                  value={euser.student_id}
                  name="student_id"
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex">
                <label className="form-label">class-</label>
                <input
                  type="text"
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
              <button
                type="reset"
                className="btn btn-primary"
                onClick={editcancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}

      <table className="table table-bordered ">
        <thead>
          <tr>
            <th>name</th>
            <th>student id</th>
            <th>class</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.length > 0 &&
            students.map((item, i) => (
              <Row
                key={item.id}
                item={item}
                deluser={deluser}
                edituser={edituser}
              />
            ))}
        </tbody>
      </table>
    </>
  );
}
