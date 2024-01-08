import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./SuperAdminDashboard.css";
import ReactPaginate from "react-paginate";

function SuperAdminDashboard() {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Initally

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/getemployees")
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

  //Searchb]Bar

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
              className=" nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle
                             "
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div id="mainheader" className="p-1 d-flex flex-column align-items-center justify-content-center shadow">
            <h4>Employee Management System</h4>
            <hr style={{ width: '50%', margin: '10px 0' ,color:'black' }} />
            <h4>SuperAdminDashboard</h4>
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
            <table className="table table-hover table">
              <thead>
                <tr>
                  <th scope="col">EmpID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Job Title</th>
                  {/* <th scope="col">Role</th> */}
                  <th scope="col">Age</th>
                  <th scope="col">Attendance</th>
                  <th scope="col">Leaves Taken</th>
                  <th scope="col">Leaves Balance</th>
                  <th scope="col" className="col-auto px-sm-2 px-0">Contact</th>
                  {/* <th scope="col">Gender</th>
                  <th scope="col">Date of Birth</th> */}
                  <th scope="col">EmailId</th>
                  {/* <th scope="col">Username</th>
                  <th scope="col">Password</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee) => (
                  <tr key={employee.emp_id}>
                    <td>{employee.emp_id}</td>
                    <td>{employee.emp_name}</td>
                    <td>{employee.job_title}</td>
                    {/* <td>{employee.role}</td> */}
                    <td>{employee.age}</td>
                    <td>{employee.attendance_percentage}</td>
                    <td>{employee.leaves_taken}</td>
                    <td>{employee.leave_balance}</td>
                    <td>{employee.contact_number}</td>
                    {/* <td>{employee.gender}</td> */}
                    {/* <td>{employee.date_of_birth}</td> */}
                    <td>{employee.email_id}</td>
                    {/* <td>{employee.username}</td>
                    <td>{employee.password}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
