import React,{useState, useEffect} from 'react'
import ProfileLayout from '../profileLayout/profileLayout'
import {Deleteaccount} from '../../serverApi/authApi'
import {Link, withRouter} from 'react-router-dom'
import ShowImage from "../../user/ShowProfilepic"
import {isAuthenticated} from "../../../container/serverApi/authApi"

const UserDashboard = (props) => {

    let {user, token} = isAuthenticated()
    // console.log("user:::::---------------------- ",myuser.user, typeof myuser.user);

    // let authenticatejwt = JSON.parse(localStorage.getItem('JWT'))
    // console.log("JSON.parse(localStorage.getItem('JWT')"+ JSON.parse(localStorage.getItem('JWT')));
    // setauthValues( {authenticatejwt} )
   

    // const [authenticate, setauthValues] = useState({})
    const [values, setValues] = useState({
                userName: `${user.userName}`,
                email: `${user.email}`,
                phoneNumber: `${user.phoneNumber}`,
                gender: `${user.gender}`,
                city: `${user.city}`,
                loading: false,
                error: "",
                success: false,
                dis: "not-allowed",
                formData: '',
                });

const {   
            userName,
            email,
            phoneNumber,
            gender,
            city,
            error,
            success,
            dis,
            loading,
            formData,
                    } = values ;

                    // console.log(JSON.stringify(authenticate))
        useEffect(() => {
            // let authenticate = JSON.parse(localStorage.getItem('JWT'))
            // setauthValues({ authenticate })
            // console.log("inside useEffect" +authenticate)
            return(setValues({ formData : new FormData(), dis: "not-allowed" }) );
          }, []);
          

        const clickedDelete = async () => {
            window.confirm("ARE YOU SURE YOU WANT TO DELETE ?")
            await Deleteaccount(user._id, token).then(data => {
                if(error) {
                     setValues({error: data.error})
                    }else{
                        localStorage.removeItem('JWT')
                        props.history.replace('/') 
                    }
            })
            alert("User deleted")
        }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
           
            try{
                setValues({...values,loading: true, error: "", success: false })  

              const ResponseData = await fetch(`http://localhost:4000/user/update/${user._id}`, {
                    method: 'PATCH',
                    headers: {
                       "Authorization" : `Bearer ${token}`
                        },
                    body: formData
                }).then(response =>  response.json())

                console.log("response:-------", ResponseData);
                await localStorage.setItem('JWT', JSON.stringify(ResponseData));
                window.location.reload();
                setValues({...values, success:true, loading: false })
                // await authenticate(ResponseData, async () => {
                //     setValues({...values, loading:false})
                //    return auth.user && auth.user.role === "admin" ? <Redirect to="/admin/dashboard" /> : props.history.replace("/User/App")
                //  })
                

                // setValues({ userName: `${user.userName}`,
                //                     email: `${user.email}`,
                //                     phoneNumber: `${user.phoneNumber}`,
                //                     gender: `${user.gender}`,
                //                     city: `${user.city}`})
               
                // props.history.push("/")
                console.log("response after:-------", ResponseData);
                setValues({...values,loading: false, error: "", success: true, auth: true})  
                
            } catch(error) {               
                setValues({ ...values, error: error, success:false, loading: false})
              }  
        } 

    const handleOnChange = name => event => {
            const value =name === "profilepic" ? event.target.files[0] : event.target.value
            formData.set(name, value)
            setValues({...values, [name] : value, dis:"pointer"})  
            }

    const userLinks = () => {
        return(
            <div className="card"  style={{width:"260px"}}>
                <div className="card-header"> 
                   <div className="imgg"> <ShowImage estyle={{Height:"90px", width:"210px", borderRadius:"50%" }} user={user}/>  </div>
                </div>
                <ul className="nav flex-column">
                     <button type="button" className="btn btn-outline-info">
                        <Link className="nav-link" to='/dashboard' style={{color:"black",fontSize:"19px"}}> Profile </Link>     
                     </button>
                     <button type="button" className='btn btn-outline-info'>
                        <Link className="nav-link"  to='/user/update/profilepic' style={{color:"black",fontSize:"19px"}}> Photo </Link>     
                     </button>
                     
                     <button  type="button" className='btn btn-outline-danger'  style={{color:"black",fontSize:"19px", cursor:"pointer"}} onClick={clickedDelete} > 
                            Delete Account 
                    </button>
               
                 </ul>
            </div>
        )}

        const userProfile = () => {
            return (
                <div className="card mb-5">
                    <h3 className="card-header" style={{fontSize: "32px", display:"ruby", color:"gray", backgroundColor: "#e3f2fd"}}> <strong> Public profile </strong></h3>
                <ul className="list-group" style={{fontFamily: "sans-serif", fontSize: "18px"}}>

                  <form onSubmit={handleOnSubmit}>
                    <li className="list-group-item" style={{textAlign:"center"}}> <input type="text"  name="userName" defaultValue={userName} onChange={handleOnChange("userName")}  style={{width:"700px",height:"50px", color:"grey", fontWeight: "bold", outlineColor:"blanchedalmond"}} autoComplete="off"/>    </li>
                    <li className="list-group-item" style={{textAlign:"center"}}> <input type="text"  name="email"    defaultValue={email}  onChange={handleOnChange("email")}    style={{width:"700px",height:"50px", color:"grey", fontWeight: "bold", outlineColor:"blanchedalmond"}} autoComplete="off"/>    </li>
                    <li className="list-group-item" style={{textAlign:"center"}}> <input type="text"  name="city"     defaultValue={city}   onChange={handleOnChange("city")}    style={{width:"700px",height:"50px", color:"grey", fontWeight: "bold", outlineColor:"blanchedalmond"}} autoComplete="off"/>    </li>

                    <li className="list-group-item" style={{textAlign:"center"}}> 
                    
                    <select className="dropdown" name='gender' value={gender}  onChange={handleOnChange('gender')} style={{width:"700px",height:"50px", color:"grey", fontWeight: "bold", outlineColor:"blanchedalmond"}} >
                        <option value=''> Select Gender </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>  <br></br>
                  </li>
                    <li className="list-group-item" style={{textAlign:"center"}}> <input type="text"  name="phoneNumber"   defaultValue={phoneNumber} onChange={handleOnChange("phoneNumber")} style={{width:"700px",height:"50px", color:"grey", fontWeight: "bold",  outlineColor:"blanchedalmond"}} autoComplete="off"/> </li> 
                      
                    <button className="btn btn-lg btn-primary"  style={{marginLeft:"45%", cursor:`${dis}`}}>
                        <strong> Save </strong>            
                    </button>     
                  </form>
                </ul>
            </div>
         
            )}

            const showError = () => (
                <div className="alert alert-danger" style={{display: error ? "" : 'none' }}> {error} </div>
                )
            const showSuccess = () => (
                 <div className="alert alert-info" style={{display: success ? "" : 'none', fontSize:"30px"}}> User Data Updated !!  </div>
                )
            const showLoading = () =>  (
                loading && (<div className="spinner-border text-info" style={{textAlign:"center"}}> <h2> Loading... </h2>  </div>)  )
        
        return(
            <ProfileLayout title=" Dashboard" description={`Hellow ${user.userName}, have a good day !!`} className="container-fluid"> 
                {showError()}
                {showSuccess()}
                {showLoading()}
                   <div className="row">
                        <div className="col-2">
                            {userLinks()}
                        </div>
                        <div className="col-10">
                            {userProfile()}
                        </div>
                    </div>
                
            </ProfileLayout>
        )
}   

export default withRouter(UserDashboard)