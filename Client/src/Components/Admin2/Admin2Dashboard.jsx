import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./Admin2Dashboard.css";
import ReactPaginate from "react-paginate";

function Admin2Dashboard() {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Initally

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/getleaves")
      .then((response) => {
        if (response.data.Status) {
          setEmployeeData(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error while retrieving data:", error);
      });
  }, []);

  const pageCount = Math.ceil(employeeData.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  //SearchBar
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = employeeData.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
    .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  //SearchbBar

  //Approve Button
  const approveleave = (empId) => {
    // You can make an API call or perform any action to update the status in the database
    // Example:
    axios
      .post(`http://localhost:3000/auth/approveleave/${empId}`)
      .then((response) => {
        if (response.data.Status) {
          // Assuming you want to update the local state after approval
          const updatedEmployeeData = employeeData.map((employee) =>
            employee.emp_id === empId ? { ...employee, status: "Approve1" } : employee
          );
          axios
      .get("http://localhost:3000/auth/getleaves")
      .then((response) => {
        if (response.data.Status) {
          setEmployeeData(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error while retrieving data:", error);
      });
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error while approving leave:", error);
      });
  };

  //Approve Button

  //Dispapprove Button
const disapproveleave =(empId) =>{
  axios
  .post(`http://localhost:3000/auth/disapproveleave/${empId}`)
  .then((response)=>{
    if (response.data.Status){
      const updatedEmployeeData = employeeData.map((employee)=>
      employee.empId===empId ? {...employee,status:"Approve"}:employee
      );
      axios
      .get("http://localhost:3000/auth/getleaves")
      .then((response) => {
        if (response.data.Status) {
          setEmployeeData(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error while retrieving data:", error);
      });
    }
    else {
      alert(response.data.Error);
    }
  })
  .catch((error) => {
    console.error("Error while approving leave:", error);
  });
}

//Disapprove Button

//Convert the Date JSON to DD/MM/YY format
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
}
//Convert the Date from JSON to DD/MM/YY format




  return (
    <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <Link 
                    to="/dashboard"
                    className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                    >
                        <span className="fs-5 fw-bolder d-none d-sm-inline">
                            GolokaIT
                        </span>
                    </Link>
                    <ul
                    className= " nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" 
                    id="menu"
                    >
                        <li className="w-100">
                            <Link
                             
                             className="nav-link text-white px-0 align-middle
                             ">
                                <i className="fs-4 bi-speedometer2 ms-2"></i>
                                <span className="ms-1 d-none d-sm-inline">Dashboard</span>
            
                             </Link>
                        </li>
                        <li className="w-100">
                            <Link 
                            to="/Admin2Approved"
                            className="nav-link px-0 align-middle text-white">
                                <i className="fs-4 bi-people ms-2"></i>
                                <span className="ms-2 d-none d-sm-inline" >Approved</span></Link>
                        </li>
                        <li className="w-100">
                            <Link 
                            to="/Admin2Disapproved"
                            className="nav-link px-0 align-middle text-white">
                                <i className="fs-4 bi-people ms-2"></i>
                                <span className="ms-2 d-none d-sm-inline" >Disapproved</span></Link>
                        </li>
                        <li className="w-100">
                            <Link 
                            className="nav-link px-0 align-middle text-white">
                                <i className="fs-4 bi-power ms-2"></i>
                                <span className="ms-2 d-none d-sm-inline">logout</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col p-0 m-0">
            <div id="mainheader" className="p-2 d-flex flex-column align-items-center justify-content-center shadow">
            <h4>Employee Management System</h4>
            <hr style={{ width: '50%', margin: '10px 0' ,color:'black' }} />
            <h4>Admin2Dashboard</h4>
          </div>

          <div className="table1">
            <div className="header">
              <div className="searchbar">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <i id="searchicon" className="bi bi-search"></i>
              </div>
            </div>
            <div className='table-container'>
            {employeeData.length > 0 ? (
            <table className="table table-hover table">
              <thead>
                <tr>
                  <th scope="col">EmpID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Sick Leaves Remaining</th>
                  <th scope="col">Paid Leaves Remaining</th>
                  <th scope="col">Number Of Days</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee) => (
                  <tr key={employee.emp_id}>
                    <td>{employee.emp_id}</td>
                    <td>{employee.employee_name}</td>
                    <td>4</td>
                    <td>{employee.leaves_remaining}</td> 
                    <td>{employee.number_of_days}</td>
                    <td>{formatDate(employee.start_date)}</td>
                    <td>{formatDate(employee.end_date)}</td>
                    <td><button className="actionbutton" onClick={() => approveleave(employee.emp_id)}>Approve</button></td>
                    <td><button className="actionbutton1" onClick={() => disapproveleave(employee.emp_id)}>Disapprove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            ) : (
              <p>No leaves pending</p>
            )}
            </div>
          </div>
          {employeeData.length > 0 && (
          <div className="paginate">
            <div className="page">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
            <div className="items-per-page">
              <span>Items per page: </span>
              <select
                value={itemsPerPage}
                onChange={(e) => {setPageNumber(0); setItemsPerPage(Number(e.target.value));}}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          )}

          <Outlet />
            </div>
          </div>
        </div>
  );
}

export default Admin2Dashboard