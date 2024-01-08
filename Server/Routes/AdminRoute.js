import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const router = express.Router()
//Login&Route
router.post('/', (req, res) => {
    const sql = "SELECT * from personneldetails where username = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })
        if (result.length > 0) {
            const email = result[0].email;
            const role = result[0].role;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: '1d' }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true ,role});
        }else{
            return res.json({loginStatus: false, Error:"wrong email or password"});
        }
    });

});
//Login&Route

//SuperAdminDashBoard
router.get('/getemployees',(req,res) => {
    const sql = "SELECT * FROM personneldetails";
    con.query(sql, (err, result) => {
        if (err) return res.json({Status:false,error:"Internal Server Error"})
        return res.json({Status: true, Result:result});
    });
});
//SuperAdminDashBoard

//Admin2Dashboard
//Pending List Admin2
router.get('/getleaves',(req,res) => {
    const sql = "SELECT * FROM employee_leave_table WHERE status='Pending'";
    con.query(sql, (err, result) => {
        if (err) return res.json({Status:false,error:"Internal Server Error"})
        return res.json({Status: true, Result:result});
    });
});
//Pending List Admin2

//Approved List Admin2
router.get('/getapproved1',(req,res) => {
    const sql = "SELECT * FROM employee_leave_table WHERE status='Approve1'";
    con.query(sql, (err, result) => {
        if (err) return res.json({Status:false,error:"Internal Server Error"})
        return res.json({Status: true, Result:result});
    });
});
//Approved List Admin2

//Approve1 Button
router.post('/approveleave/:empId', (req, res) => {
    const empId = req.params.empId;
  
    // Assuming your database table has a column named 'status'
    const sql = "UPDATE employee_leave_table SET status = 'Approve1' WHERE emp_id = ?";
    con.query(sql, [empId], (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: "Failed to approve leave" });
      }
  
      return res.json({ Status: true, Message: "Leave approved successfully" });
    });
  });
//Approve1 Button

//Disapprove Button
router.post('/disapproveleave/:empId', (req, res) => {
    const empId = req.params.empId;
  
    // Assuming your database table has a column named 'status'
    const sql = "UPDATE employee_leave_table SET status = 'Disapprove1' WHERE emp_id = ?";
    con.query(sql, [empId], (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: "Failed to approve leave" });
      }
  
      return res.json({ Status: true, Message: "Leave approved successfully" });
    });
  });
//Disapprove Button

//DisapprovedList
router.get('/getdisapproved1',(req,res) => {
    const sql = "SELECT * FROM employee_leave_table WHERE status='Disapprove1'";
    con.query(sql, (err, result) => {
        if (err) return res.json({Status:false,error:"Internal Server Error"})
        return res.json({Status: true, Result:result});
    });
});
//DisapprovedList


//Admin2Dashboard

//Admin1Dashboard
//Pending List Admin1
router.get('/getleaves1',(req,res) => {
    const sql = "SELECT * FROM employee_leave_table WHERE status='Approve1'";
    con.query(sql, (err, result) => {
        if (err) return res.json({Status:false,error:"Internal Server Error"})
        return res.json({Status: true, Result:result});
    });
});
//Pending List Admin1
//Approve Button
router.post('/approveleave2/:empId', (req, res) => {
    const empId = req.params.empId;
  
    // Assuming your database table has a column named 'status'
    const sql = "UPDATE employee_leave_table SET status = 'Approve' WHERE emp_id = ?";
    con.query(sql, [empId], (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: "Failed to approve leave" });
      }
  
      return res.json({ Status: true, Message: "Leave approved successfully" });
    });
  });
//Approve Button

//Approve Email
const transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'dhananjay@golokait.com',
    password:'Djay2605'
  }
});
//Approve Email

//Approved List Admin
router.get('/getapproved',(req,res) => {
    const sql = "SELECT * FROM employee_leave_table WHERE status='Approve'";
    con.query(sql, (err, result) => {
        if (err) return res.json({Status:false,error:"Internal Server Error"})
        return res.json({Status: true, Result:result});
    });
});
//Approved List Admin

//Disapprove Button
router.post('/disapproveleave2/:empId', (req, res) => {
    const empId = req.params.empId;
  
    // Assuming your database table has a column named 'status'
    const sql = "UPDATE employee_leave_table SET status = 'Disapprove' WHERE emp_id = ?";
    con.query(sql, [empId], (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: "Failed to approve leave" });
      }
  
      return res.json({ Status: true, Message: "Leave approved successfully" });
    });
  });
//Disapprove Button

//DisapprovedList
router.get('/getdisapproved',(req,res) => {
    const sql = "SELECT * FROM employee_leave_table WHERE status='Disapprove'";
    con.query(sql, (err, result) => {
        if (err) return res.json({Status:false,error:"Internal Server Error"})
        return res.json({Status: true, Result:result});
    });
});
//DisapprovedList

//Admin1Dashboard

export default router;