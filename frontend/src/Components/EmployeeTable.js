import React from "react";
import { Link } from "react-router-dom";

function EmployeeTable({ employees, pagination, fetchEmployees, handleUpdateEmployee,handleDeleteEmployee }) {
  const headers = [
    "Emp_Id",
    "Image",
    "Name",
    "Email",
    "MobileNo",
    "Designation",
    "Gender",
    "Course",
    "CreatDate",
    "Actions",
  ];

  const { currentPage, totalPages } = pagination;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
        handlePagination(currentPage + 1);
    }
};

const handlePreviousPage = () => {
    if (currentPage > 1) {
        handlePagination(currentPage - 1);
    }
};
const handlePagination = (currPage) => {
    fetchEmployees('', currPage, 4)
}


  const TableRow = ({ employee }) => {
    return (
      <tr>
        <td>{employee._id}</td>
        <td>
          <img
            src={employee.profileImage}
            alt={`${employee.name}'s profile`}
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              border: "1px solid blue",
            }}
          />
        </td>

        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.mobileno}</td>
        <td>{employee.designation}</td>
        <td>{employee.gender}</td>
        <td>{employee.course.join(' ')}</td>
        <td>{new Date(employee.createdate).toLocaleDateString("en-GB")}</td>
        <td>
          <i
            className="bi bi-pencil-fill text-warning me-4"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit"
            onClick={() => handleUpdateEmployee(employee)}
          ></i>
          <i
            className="bi bi-trash-fill text-danger"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            // title="Delete"
            onClick={() => handleDeleteEmployee (employee)}
          ></i>
        </td>
      </tr>
    );
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );


  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <div> Data Not Found</div>
          ) : (
            employees.map((emp) => <TableRow employee={emp} key={emp._id} />)
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center my-3">
        <span className="badge bg-primary">
          Page {currentPage} of {totalPages}
        </span>

        
        <div>


          
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {pageNumbers.map((page) => (
            <button

            //   key={page}
              className={`btn btn-outline-primary me-1 ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePagination(page)}
            >

              {page}
            </button>
          ))}

          <button
            className="btn btn-outline-primary me-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeTable;
