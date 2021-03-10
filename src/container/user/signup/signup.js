import React, {useState, useEffect} from 'react'
import FormInput from '../../../component/UI/formInput/formInput'
import Button from '../../../component/UI/button/button'
import './signup.css'
import { Link } from 'react-router-dom'

const SignUpUser = (props) => {
    const [values, setValues] = useState({
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            gender: '',
            role: '',
            city: '',
            loading: false,
            error: "",
            formData: '',
            });

    const {   
            userName,
            email,
            password,
            confirmPassword,
            phoneNumber,
            gender,
            role,
            city,
            error,
            formData,
                } = values ;

            useEffect(() => {
                return(setValues({...values, formData : new FormData() }) );
            }, [values]);

    const handleonSubmit = async event  => {
        event.preventDefault()

        try {
            setValues({loading: true, error: ""})
            await fetch("http://localhost:4000/user/signup", {
                          method: 'POST',
                          body: formData
                          }).then(response => response.json() )
                  
            setValues({...values, success:true,  userName: '',email: '',password: '',confirmPassword: '',
                            role: '', phoneNumber: '', gender: '',city: '', formData: ''  })
          } catch(error) {
              setValues({ ...values, error: error})
              return props.history.replace("/Signin") 
              }
    }

    const handleonchange = name => event => {
            const value =name === "profilepic" ? event.target.files[0] : event.target.value
            formData.set(name, value)
            setValues({...values, [name] : value})  
        }

    const userFormData = () => {
        return ( <form  onSubmit={handleonSubmit}>

            <FormInput type="text"      name='userName'        value={userName}        labal='User Name'        onChange={handleonchange('userName')}  required/>  
            <FormInput type="text"      name='email'           value={email}           labal='E-mail'           onChange={handleonchange('email')}  required/>  
            <FormInput type="password"  name='password'        value={password}        labal='Password'         onChange={handleonchange('password')}  required/>  
            <FormInput type="password"  name='confirmPassword' value={confirmPassword} labal='Confirm Password' onChange={handleonchange('confirmPassword')}  required/> 
            <FormInput type="text"      name='phoneNumber'     value={phoneNumber}     labal='Phone Number'     onChange={handleonchange('phoneNumber')}  required/>
            <FormInput type="text"      name='city'            value={city}            labal='City'             onChange={handleonchange('city')}  required/>
            <FormInput type="file"      name="profilepic"      onChange={handleonchange('profilepic')}  />
        
            <select className="dropinput"  name='role' value={role}  onChange={handleonchange('role')}  required >
                    <option value=''>--Select Role--</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
            </select>  
            <select className="dropinput" name='gender' value={gender}  onChange={handleonchange('gender')}  required >
                    <option value=''>--Select Gender--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
            </select>  <br></br>
    
            <Button btnType={'formSuccessHomepage'} ><h3> SIGN UP </h3></Button>
     </form> )
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "" : 'none' }}> {error} </div>
        )
 
    return(
        <React.Fragment>
            <div className="signup">
            <h2 style={{padding:'20px', color: 'gray'}}><u><b> CREATE ACCOUNT </b></u></h2>
        <h5 style={{"padding": "10px"}} > I Do Have An Account! <b><Link to="/Signin"> SignIn </Link></b> </h5>
                {showError()}
                {userFormData()}
            </div>    
        </React.Fragment>
        )
    }

export default SignUpUser