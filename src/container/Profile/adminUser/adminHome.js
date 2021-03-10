import React from 'react'
import ProfileLayout from '../profileLayout/profileLayout'
import {isAuthenticated}from '../../serverApi/authApi'
import {Link} from 'react-router-dom'

const AdminDashboard = (props) => {
    const {user: { userName, email, role, city, phoneNumber, gender, confirmPassword}} = isAuthenticated()

        const adminLinks = () => {
            return(
                <div className="card">
                    <h3 className="card-header" style={{fontSize: "30px"}}> Admin Links </h3>
                    <ul className="list-group">
                         <li className="list-group-item" style={{fontSize: "22px"}}>
                            <Link className="nav-link" to='/create/diet'> Create Diet </Link>     
                         </li>
                     </ul>
                </div>
            )}

        const adminProfile = () => {
            return (
                <div className="card mb-5">
                    <h3 className="card-header" style={{fontSize: "45px", display:"ruby"}}> Admin Informaton</h3>
                <ul className="list-group" style={{fontFamily: "sans-serif", fontSize: "20px"}}>
                    <li className="list-group-item" > Name:  <b> {userName} </b> </li>
                    <li className="list-group-item"> E-mail: <b> {email} </b> </li>
                    <li className="list-group-item"> Role: <b> {role} </b></li>
                    <li className="list-group-item"> City: <b> {city} </b></li>
                    <li className="list-group-item"> Phone Number: <b> {phoneNumber} </b></li>
                    <li className="list-group-item"> Gender: <b> {gender} </b></li>
                    <li className="list-group-item"> Password: <b> <input type="password" defaultValue={confirmPassword} style={{border: "1px 2px grey"}}/> </b></li>
                </ul>
                    <button className="btn btn-primary" onClick={() => props.history.push("/dashboard")}>
                        <Link to="/dashboard" style={{color:"yellow", fontSize:"20px"}}><strong> Edit </strong></Link>            
                    </button>
            </div>
            )}
        
        return(
            <ProfileLayout title="Admin Dashboard" description={`Hellow ${userName}, have a good day !!`} className="container-fluid"> 
                    <div className="row">
                        <div className="col-3">
                            {adminLinks()}
                        </div>
                        <div className="col-9">
                            {adminProfile()}
                        </div>
                    </div>

                
            </ProfileLayout>
        )
}   

export default AdminDashboard