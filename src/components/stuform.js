import React, { useState } from "react";
import "../styles/stuform.css";
import { ClipLoader } from "react-spinners";
import Row from "./trow";
import axios from "axios";
export default function Stuform({
  students = {},

  setDbchange = {},
}) {
  const dvalue = { id: "", name: "", stu_id: "", stu_class: "" };

  const [user, setuser] = useState(dvalue);
  const [edit, setedit] = useState(false);

  const [euser, seteuser] = useState(dvalue);
  function edituser(data) {
    // console.log(data);
    setedit(true);
    seteuser(data);
  }

  //spinner loading

  const [Eloading, setELoading] = useState(false);
  const [Sloading, setSLoading] = useState(false);
  const [Dloading, setDLoading] = useState(false);

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
    console.log(wal);
    seteuser(wal);
    console.log(euser);
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
    setSLoading(true);
    let valu = { ...user };
    //console.log(valu);
    axios
      .post("https://scool-swart.vercel.app/api/student", { ...valu })
      .then((res) => {
        console.log(res);
        setDbchange((prev) => !prev);
        setSLoading(false);
      });

    setuser(dvalue);
  }

  function editsubmit(event) {
    event.preventDefault();
    setELoading(true);
    console.log(euser);
    axios
      .put("https://scool-swart.vercel.app/api/student", { ...euser })
      .then((res) => {
        console.log(res);
        setDbchange((prev) => !prev);
        setELoading(false);
        setedit(false);
      });
  }

  function deluser(data) {
    let delid = data.id;
    //console.log(delid);
    setDLoading(true);
    axios
      .delete("https://scool-swart.vercel.app/api/student", {
        data: { id: delid + "" },
      })
      .then((res) => {
        console.log(res);
        setDbchange((prev) => !prev);
        setDLoading(false);
        setedit(false);
      });
  }

  return (
    <>
      {!edit ? (
        <>
          <h4 className="heading">ADD STUDENT</h4>
          <form className="stu-form" onSubmit={formSubmit}>
            <div className="mb-3">
              <div className="flex">
                <label className="form-label">Name</label>
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
                <label className="form-label">Student id</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={eventHandle}
                  name="stu_id"
                  value={user.stu_id}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex">
                <label className="form-label">Class</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={eventHandle}
                  name="stu_class"
                  value={user.stu_class}
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button
                type="submit"
                className="btn btn-primary align-items-center d-flex me-2 "
              >
                <ClipLoader color="#ffffff" loading={Sloading} size={10} />
                Submit
              </button>
              <div className=" d-block width-25">
                <div>
                  <ClipLoader color="#e71a1a" loading={Dloading} size={25} />
                </div>
              </div>

              <button
                type="reset"
                className="btn btn-danger ms-2"
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
                <label className="form-label">Name</label>
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
                <label className="form-label">Student id</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleEditChange}
                  value={euser.stu_id}
                  name="stu_id"
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex">
                <label className="form-label">Class</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleEditChange}
                  value={euser.stu_class}
                  name="stu_class"
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-danger me-5">
                <ClipLoader color="#ffffff" loading={Eloading} size={10} />
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

      <table className="table table-bordered mt-5 ">
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
                Dloading={Dloading}
              />
            ))}
        </tbody>
      </table>
    </>
  );
}
