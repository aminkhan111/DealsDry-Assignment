import React, { useEffect, useState } from "react";
import { CreateEmployee, UpdateEmployeeById } from "../api";
import { notify } from "../utils";
// import { Await } from "react-router-dom";



function AddEmployee({ showModal, setShowModal, fetchEmployees , updateEmpObj }) {

    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobileno: '',
        designation: '',
        gender: '',
        course: [],
        profileImage: null
    });
    const [validationErrors, setValidationErrors] = useState({});

    const [updateMode, setUpdateMode] = useState(false);
    // #1 --Changes In use effect 

    // useEffect(() => {
    //   if(updateEmpObj){
        
    //     setUpdateMode(true);
    //     setEmployee(updateEmpObj );
    //   }
    // }, [updateEmpObj])


    useEffect(() => {
      if (updateEmpObj) {
          setUpdateMode(true);
          setEmployee({
              ...updateEmpObj,
              course: Array.isArray(updateEmpObj.course) ? updateEmpObj.course : [] // Ensure 'course' is an array
          });
      }
  }, [updateEmpObj]);


    const resetEmployeeStates = () => {
      setEmployee({
        name: '',
        email: '',
        mobileno: '',
        designation: '',
        gender: '',
        course: [], // change in to Array
        profileImage: null
      })
  }

  const handleClose = () => {
    setShowModal(false);
    // setUpdateMode(false);
    // resetEmployeeStates();
  };
  //# 2 in second changes

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEmployee({ ...employee, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
  
    if (type === 'checkbox') {
        setEmployee((prevState) => {
            if (checked) {
                // Add the course to the array if checked
                return { ...prevState, course: [...prevState.course, value] };
            } else {
                // Remove the course from the array if unchecked
                return {
                    ...prevState,
                    course: prevState.course.filter((course) => course !== value),
                };
            }
        });
    } else {
        setEmployee({ ...employee, [name]: value });
    }
  };


  
  const handleFileChange = (e) => {
    setEmployee({ ...employee, profileImage: e.target.files[0] });
};


// Add  or update Employee

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee);
try{
  const {success, message, errors} =
  updateMode ? 
  await UpdateEmployeeById (employee , employee._id)
  :await CreateEmployee(employee);
  console.log(success, message);

  if(success){
    notify(message, 'success');
    window.location.reload(); 
    setShowModal(false);
  resetEmployeeStates();
  fetchEmployees();
  }else{
    notify(message,'error');
    if (errors) {
      setValidationErrors(errors);
  }

  }
  
}catch (err){
  console.error("Error while creating employee:", err);

notify(err, 'err');

}};


  return (
    <div
      className={`modal ${showModal ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{
                            updateMode ? 'Update Employee' : 'Add Employee'
                        }</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => handleClose()}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={(e)=> handleSubmit(e)} >
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
                 {validationErrors.email && (
        <div className="text-danger">{validationErrors.email.message}</div>
    )}
              </div>
              <div className="mb-3">
                <label className="form-label">MobileNo</label>
                <input
                  type="text"
                  className="form-control"
                  name="mobileno"
                  value={employee.mobileno}
                  onChange={handleChange}
                  required
                />
                  {validationErrors.mobileno && (
        <div className="text-danger">{validationErrors.mobileno.message}</div>
    )}
 
              </div>


<div className="mb-3">
  <label className="form-label">Designation</label>
  <select
    className="form-control"
    name="designation"
    value={employee.designation}
    onChange={handleChange}
    required
  >
    <option value="">Select Designation</option>
    <option value="HR">HR</option>
    <option value="Manager">Manager</option>
    <option value="Sales">Sales</option>
  </select>
</div>


<div className="mb-3">
    <label className="form-label">Gender</label>
    <div>
        {["Male", "Female", "Other"].map((gender) => (
            <div key={gender} className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id={`gender${gender}`}
                    value={gender}
                    checked={employee.gender === gender}
                    onChange={handleChange}
                    required
                />
                <label className="form-check-label" htmlFor={`gender${gender}`}>
                    {gender}
                </label>
            </div>
        ))}
    </div>
</div>

<div className="mb-3">
  <label className="form-label">Course</label>
  <div>
    {['MCA', 'BCA', 'BSC'].map((course) => (
      <div key={course} className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          name="course"
          value={course}
          id={`course${course}`}
          checked={employee.course.includes(course)}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor={`course${course}`}>
          {course}
        </label>
      </div>
    ))}
  </div>
</div>


              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="profileImage"
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {updateMode ? "Update" : "Save"}
                
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
