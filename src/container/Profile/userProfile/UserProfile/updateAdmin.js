import React, {useState, useEffect} from 'react'
import AdminLayout from './adminLayout/adminLayout'
import {isAuthenticated}from '../serverApi/authApi'

const UpdateAdminDashboard = () => {
    const {user} = isAuthenticated()

    const [values, setValues] = useState({
        userName: `${user.userName}`,
        email: `${user.email}`,
        password: `${user.password}`,
        confirmPassword: `${user.confirmPassword}`,
        phoneNumber: `${user.phoneNumber}`,
        gender: `${user.gender}`,
        city: `${user.city}`,
        loading: false,
        error: "",
        success: false,
        formData: '',
        });

const {   
        userName,
        email,
        password,
        confirmPassword,
        phoneNumber,
        gender,
        city,
        error,
        success,
        formData,
            } = values ;

        useEffect(() => {
            return(setValues({...values, formData : new FormData() }) );
        }, []);

    const handleonchange = name => event => {
        const value =name === "profilepic" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name] : value})  
            }

        const adminProfile = () => {
            return (
                <div className="card mb-11">
                    <h3 className="card-header" style={{fontSize: "45px", display:"ruby"}}> Edit Admin Informaton</h3>
                <ul className="list-group" style={{fontFamily: "sans-serif", fontSize: "20px"}}>
                    <li className="list-group-item"> Name: <input type="text" value={userName}  onChange={handleonchange('userName')} autoComplete="off"/>  </li>
                    <li className="list-group-item"> E-mail: <input type="text" value={email}  onChange={handleonchange('email')} />                            </li>
                    <li className="list-group-item"> City: <input type="text" value={city}  onChange={handleonchange('city')} />                              </li>
                    <li className="list-group-item"> Phone Number: <input type="text" value={phoneNumber}  onChange={handleonchange('phoneNumber')} /></li>
                    <li className="list-group-item"> Password: <b> <input type="password" value={password} onChange={handleonchange('password')}/> </b></li>
                    <li className="list-group-item"> Gender: <b> {gender} </b></li>
                </ul>
            
            </div>
            )}
        
        return(
            <AdminLayout title="Admin Dashboard" description={`Hellow ${user.userName}, have a good day !!`} className="container-fluid"> 
                    <div className="row">
                        <div className="col-9">
                            {adminProfile()}
                        </div>
                    </div>

                
            </AdminLayout>
        )
}   

export default UpdateAdminDashboard