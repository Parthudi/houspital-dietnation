import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticated} from './authApi'

const AdminRoute = ({component: Component , ...props}) => 
        <Route {...props} render={props => isAuthenticated() && isAuthenticated().user.role === "admin" ?
         (  <Component {...props} /> )        : 
         
         ( <Redirect to={{pathname: '/signin' , state:{from: props.location}}} />  ) }  />
    

export default AdminRoute