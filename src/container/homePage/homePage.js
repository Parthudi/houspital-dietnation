import React, { Component } from 'react'
import {withRouter, Route} from 'react-router-dom'
import Button from '../../component/UI/button/button'
import Signin from '../signin/signin'
import classes from './homePage.css'
import LOGO from '../../component/images/houspitallogo.png'

class HomePage extends Component {
       
         clickedSignup = () => {
                this.props.history.push('/Signup')
            }

        clickedSignin = () => {
                this.props.history.push('/Signin')
            }
      
    render() {
    return(
        <React.Fragment>
        <div className={classes.homepage}>
            <div className={classes.logo}>
                <img src={LOGO} alt='Logo'  /> 
            </div>
            <h2> Are You A User Of Our Application ? </h2> <br></br><br></br>
            <Button btnType={'formSuccessHomepage'} clicked={this.clickedSignin}> SignIn </Button>
            <Button btnType={'formDangerHomepage'} clicked={this.clickedSignup}> SignUp </Button>
            <Route path='/Signin' Component={Signin}/>
        </div>
        </React.Fragment>
    )
}
}

export default withRouter(HomePage)