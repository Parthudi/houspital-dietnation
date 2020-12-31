import React, { Component } from 'react'
import  classes from './signin.css'
import Button from '../../component/UI/button/button'
import { withRouter} from 'react-router-dom'
import FormInput from '../../component/UI/formInput/formInput'

class Signin extends Component {
    state = {
        email: "",
        password: "",
        error: false,
        message: ''
    }
    
    handleonSubmit = async event => {
        event.preventDefault()

         try {
            const response =  await fetch("http://localhost:4000/user/login", {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                              },
                          body: JSON.stringify({                             
                              email: event.target.email.value,
                              password:  event.target.password.value,
                          })
                      })
                     
                   const responseData = await response.json();
                
                   console.log(responseData)
          } catch(error) {
                 this.setState({ error: true })
             }
              this.setState({
                email: '',
                password: '',
              })
             if(!this.state.error) {
                    this.props.history.push('/App')
                }
        }

    handleSignup = () => {
         this.props.history.push('Signup')
    }

    OnHandleChange = (event) => {
        
        this.setState({ [event.target.name] : event.target.value  })
         
        }

    render() {
        return(
            <div className={classes.signinform}>
                      <h1> I already have an account </h1> 
                <span className={classes.statement}> Signin with your email & password </span> <br/><br/>

                {this.state.error ? <span style={{color:'darkred', fontWeight:'bold'}}> User Not Found </span> : null  } 

                <form className={classes.forum} onSubmit={ this.handleonSubmit }>
                    
                    <FormInput  type="text"  name='email' labal='E-mail' value={this.state.email}  onChange={this.OnHandleChange}  required  /> 
            
                    <FormInput  type="password" name='password' labal='Password'  value={this.state.password}  onChange={this.OnHandleChange}  required  /> 
                
                    <Button btnType={'Success'}> SignIn </Button>  <br></br> 
                    
                </form>
                  <Button btnType={'Danger'} clicked={this.handleSignup}> Dont Have An Account ? SignUp </Button> 
            </div>
        )
    }
} 

export default withRouter(Signin)

