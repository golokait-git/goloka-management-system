import React from 'react'
import './EmployeeLeave.css';

function EmployeeLeaveForm() {
    return (
        <div>
            <h4>EmployeeLeaveForm</h4>
            <div className='container'>
                <form className='form'>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        
                    </div>
                    <div class="form-group">
                        <label for="exampleInputdate">Number Of Days</label>
                        <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Number Of Days" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputdate">Start Date</label>
                        <input type="date" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputdate">End Date</label>
                        <input type="date" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <hr style={{ width: '100%', margin: '10px 0' ,color:'black' }} />
                    <button type="submit" className="btn btn-primary">Apply</button>
                </form>
            </div>
        </div>

    )
}

export default EmployeeLeaveForm