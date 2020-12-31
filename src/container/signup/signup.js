import React, {Component} from 'react'
import FormInput from '../../component/UI/formInput/formInput'
import Button from '../../component/UI/button/button'

import classes from'./signup.css'

class SignUp extends Component {
    state = {
        // upload: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        gender: '',
        city: '',
        error: false,
        message: ''
            }

    handleonSubmit = async event  => {
        event.preventDefault()

        try {
            const response =  await fetch("http://localhost:4000/user/signup", {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                              },
                          body: JSON.stringify({
                            //   upload: event.target.upload.value,
                              userName: event.target.userName.value,
                              email: event.target.email.value,
                              password:  event.target.password.value,
                              confirmPassword:  event.target.confirmPassword.value,
                              phoneNumber:  event.target.phoneNumber.value,
                              city: event.target.city.value,
                              gender: event.target.gender.value
                             
                          })
                      })
                   const responseData = await response.json();
                  
                   console.log(responseData)

          } catch(error) {
                this.setState({ error: true, message: error.message })
              }
              this.setState({
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phoneNumber: '',
                gender: '',
                city: '',
                // upload: ''
            })
            if(!this.state.error) {
                this.props.history.push('/Signin')
            }
    
    }

    handleonchange = (event) => {
            this.setState({ [event.target.name ] : [event.target.value] })
        }
    handleSignin = () => {
        this.props.history.push('/Signin')
        }

 render() {
  
    return(
        <React.Fragment>
        
         <div className={classes.signup}>
           <h1 style={{margin:'20px'}}> CREATE ACCOUNT </h1>

           {this.state.error ? <span style={{color:'darkred', fontWeight:'bold'}}> {this.state.message} </span> : null  } 
              <form className={classes.signupform} onSubmit={this.handleonSubmit}>
                 {/* <input type="file"          name='upload'          value={this.state.upload}                                   onChange={this.handleonchange}  required/>   */}
                 <FormInput type="text"      name='userName'        value={this.state.userName}        labal='User Name'        onChange={this.handleonchange}  required/>  
                 <FormInput type="text"      name='email'           value={this.state.email}           labal='E-mail'           onChange={this.handleonchange}  required/>  
                 <FormInput type="password"  name='password'        value={this.state.password}        labal='Password'         onChange={this.handleonchange}  required/>  
                 <FormInput type="password"  name='confirmPassword' value={this.state.confirmPassword} labal='Confirm Password' onChange={this.handleonchange}  required/> 
                 <FormInput type="text"      name='phoneNumber'     value={this.state.phoneNumber}     labal='Phone Number'     onChange={this.handleonchange}  required/>
                 <FormInput type="text"      name='city'            value={this.state.city}            labal='City'             onChange={this.handleonchange}  required/>
                
                  <select className={classes.dropinput} name='gender' value={this.state.gender}  onChange={this.handleonchange}  required >
                            <option value=''> Select Gender </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                    </select>  <br></br>
            
                 <Button btnType={'Success'} > SIGN UP </Button>
              </form>
              <Button btnType={'Danger'} clicked={this.handleSignin}> I Do Have An Account? SignIn  </Button>
          
        </div>
       
        </React.Fragment>
        )
    }
}

export default SignUp