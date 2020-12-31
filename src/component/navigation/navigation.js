import React from 'react'
import {Link} from 'react-router-dom'

const Navigations = (props) => {
    return(
        <div>
            <Link to='/'  > Homepage </Link>
            <Link to='/Signup' >  SignUp </Link>
            <Link to='/Signin'>  SignIn </Link>
        </div>
    )
}

export default Navigations