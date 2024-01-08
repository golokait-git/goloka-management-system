import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import{BrowserRouter,Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'

import Category from './Components/Category'

import AddCategory from './Components/AddCategory'
import SuperAdminDashboard from './Components/SuperAdmin/SuperAdminDashboard'
import Admin1Dashboard from './Components/Admin1/Admin1Dashboard'
import Admin2Dashboard from './Components/Admin2/Admin2Dashboard'
import EmployeeDashboard from './Components/Employee/EmployeeDashboard'
import EmployeeLeaveForm from './Components/Employee/EmployeeLeaveForm'
import Admin2Approved from './Components/Admin2/Admin2Approved'
import Admin1Approved from './Components/Admin1/Admin1Approved'
import Admin1DisApproved from './Components/Admin1/Admin1Disapproved'
import Admin2DisApproved from './Components/Admin2/Admin2Disapproved'

function App() {
 

  return (
<BrowserRouter>
<Routes>
  <Route path='/' element={<Login />}></Route>
  <Route path='/dashboard' element={<Dashboard />}></Route>
  
  <Route path='/SuperAdminDashboard' element={<SuperAdminDashboard/>}></Route>
  <Route path='/Admin1Dashboard' element={<Admin1Dashboard/>}></Route>
  <Route path='/Admin1Approved' element={<Admin1Approved/>}></Route>
  <Route path='/Admin1Disapproved' element={<Admin1DisApproved/>}></Route>
  <Route path='/Admin2Dashboard' element={<Admin2Dashboard/>}></Route>
  <Route path='/Admin2Approved' element={<Admin2Approved />}></Route>
  <Route path='/Admin2Disapproved' element={<Admin2DisApproved />}></Route>
  <Route path='/EmployeeDashboard' element={<EmployeeDashboard/>}>
  <Route path='/EmployeeDashboard/EmployeeLeaveForm' element={<EmployeeLeaveForm />}></Route>
  </Route>

  <Route path='/dashboard/category' element={<Category />}></Route>
  
  <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
</Routes>
</BrowserRouter>
  )
}

export default App
