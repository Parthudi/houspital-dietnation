import React, { useState} from 'react'
import  classes from './signin.css'
import Button from '../../../component/UI/button/button'
import { Redirect, withRouter,Link} from 'react-router-dom'
import FormInput from '../../../component/UI/formInput/formInput'
import {signinUser} from '../UserApi'
import {authenticate,isAuthenticated} from '../../serverApi/authApi'

const SignIn = (props) => {
    const [values, setValues] = useState({
        email: "pravin@gmail.com",
        password: "dharvi",
        error: "",
        loading: false,
    })

    const {user} = isAuthenticated()
    const {email, password, error, loading} = values
    
    const handleonSubmit = async event => {
        event.preventDefault()

        setValues({ ...values, error: "", loading: true})
        signinUser({email, password}).then(datas => {
            if(datas.error) {
                setValues({ ...values, error: datas.error, loading:false})
             } else {
                authenticate(datas, () => {
                    setValues({...values, loading:false})
                   return user && user.role === "admin" ? <Redirect to="/admin/dashboard" /> : props.history.replace("/User/App")
                 })
              }
           })
        }

    const OnHandleChange = name => (event) => {       
        setValues({...values, [name] : event.target.value, error: "" })        
        }

    const signInHandler = () => {
        return( <form className={classes.forum} onSubmit={handleonSubmit}>
                    
            <FormInput  type="text"  name='email' labal='E-mail' value={email}  onChange={OnHandleChange("email")}  required  /> 

            <FormInput  type="password" name='password' labal='Password'  value={password}  onChange={OnHandleChange("password")}  required  /> 
                
            <Button btnType={'Success'} > SignIn </Button>  <br></br> 
        
            </form>
        )
    }
    const showError = () => (
        <div  style={{display: error ? "" : 'none' }}> {error} </div>
          )
    const showLoading = () =>  (
        loading && (<div className="alert alert-info"> <h2> Loading... </h2>  </div>)  )
            
        return(
            <div className={classes.signinform} style={{marginTop: "100px"}}>
                    <h1> I already have an account </h1> 
                    <span className={classes.statement}> Signin with your email & password </span> <br/><br/>
                    {showError()}
                    {showLoading()}
                    {signInHandler()}        
                    <Button btnType={'Danger'} > Dont Have An Account ? <Link to="/Signup"> SignUp </Link></Button> 
            </div>
        )
 } 

export default withRouter(SignIn)

