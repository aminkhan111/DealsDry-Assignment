import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import AddEmployee from './AddEmployee';
import { DeleteEmployeeById, GetAllEmployees } from "../api";
import { ToastContainer } from 'react-toastify';
import { notify } from "../utils";


function EmployeeManagementApp() {
const [showModal, setShowModal] = useState(false);
const [updateEmpObj, setUpdateEmpObj ] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    employees: [],
    pagination: {
        currentPage: 1,
        pageSize: 4,
        totalEmployees: 0,
        totalPages: 0
    }
});



  const fetchEmployees = async (search = '', page = 1, limit = 4) => {
    console.log('Called fetchEmployees')
    try {
        const { data } =
            await GetAllEmployees(search, page, limit);
            // console.log(data);
            setEmployeeData(data);
         
         
    } catch (err) {
        alert('Error', err);
    }
}

//  console.log('---employeeData--', employeeData)
useEffect(() => {
  fetchEmployees();
}, [])

// if (!employee) {
//   return <div>Employee not found</div>;
// }

const handleAddEmployee = () => {
  setShowModal(true)
}
const handleUpdateEmployee = (empObj) =>{
  console.log('Update obj', empObj);
  setUpdateEmpObj(empObj);
  setShowModal(true);
}

const handleDeleteEmployee = async(emp) => {
  try {
    const {success, message } =
        await DeleteEmployeeById(emp._id);
        // console.log(data);
         
        if(success){
          notify(message, 'success');
          window.location.reload(); 
        }else{
          notify(message, 'error');
        }
} catch (err) {
    alert('Error', err);
    notify( 'error');
}
}

const handleSearch =(e)=> {
  fetchEmployees(e.target.value)
}


  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>Employee List </h1>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-90 border bg-light p-3" style={{ width: "90%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary"
              onClick={() => handleAddEmployee() }
            >
              Add Employee
            </button>
            <span className="badge bg-primary justify-content-between align-items-center my-2">
          Total Employee = {employeeData.pagination.totalEmployees} 
        </span>
            <div className="input-group w-50">
  <input
    type="text"
    placeholder="Search Employees..."
    className="form-control"
    onChange={handleSearch}
  />
  <button className="btn btn-primary" type="button">
    <i className="bi bi-search"></i>
  </button>
</div>

          </div>
           <EmployeeTable 
           handleDeleteEmployee = {handleDeleteEmployee}
           handleUpdateEmployee ={handleUpdateEmployee}
           fetchEmployees ={fetchEmployees}
            employees={employeeData.employees}
            pagination={employeeData.pagination}
           />

           <AddEmployee 
           updateEmpObj={updateEmpObj}
           fetchEmployees={fetchEmployees}
         showModal={showModal}
         setShowModal = {setShowModal}
       />
        </div>
      </div>
      <ToastContainer
                position='top-right'
                autoClose={4000}
                hideProgressBar={false}
            />

    </div>
  );
}
export default EmployeeManagementApp;
