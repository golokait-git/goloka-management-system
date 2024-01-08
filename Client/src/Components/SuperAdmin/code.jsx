const nodemailer = require('nodemailer');

// Assuming you have set up the nodemailer transporter with your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

const approveleave = (empId) => {
  axios
    .post(`http://localhost:3000/auth/approveleave2/${empId}`)
    .then(async (response) => {
      if (response.data.Status) {
        const updatedEmployeeData = employeeData.map((employee) =>
          employee.emp_id === empId ? { ...employee, status: "Approve1" } : employee
        );
        await axios
          .get("http://localhost:3000/auth/getleaves1")
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

        // Fetch employee email from employee_leave_table
        const employeeDetails = await axios.get(`http://localhost:3000/auth/getEmployeeDetails/${empId}`);
        const employeeEmail = employeeDetails.data.Result[0].email;

        // Fetch admin email from personneldetails with role 'Admin1'
        const adminDetails = await axios.get("http://localhost:3000/auth/getAdmin1Details");
        const adminEmail = adminDetails.data.Result[0].email;

        // Send email to the employee
        transporter.sendMail({
          from: 'your-email@gmail.com',
          to: employeeEmail,
          subject: 'Leave Approved',
          text: 'Your leave has been approved. Enjoy your time off!'
        });

        // Send email to the Admin1
        transporter.sendMail({
          from: 'your-email@gmail.com',
          to: adminEmail,
          subject: 'Leave Approved',
          text: `Leave for employee with ID ${empId} has been approved.`
        });
      } else {
        alert(response.data.Error);
      }
    })
    .catch((error) => {
      console.error("Error while approving leave:", error);
    });
};
