import React from 'react'
import classes from './header.css'
import Logo from '../logo/logo'
import Menu from '../headerRoutes/headerRoutes'
 // <header className={classes.Toolbar}>
//</header>  
const header = (props) => {

    return(          
        <nav className="navbar navbar-light" style={{backgroundColor: "#2f3366"}}>
       
            <div className={classes.Logo} >
                <Logo logstyle={{height:"50px"}}/>
            </div> 
            <div className={classes.showright}> 
                <Menu />     
            </div>

        </nav>
    )
}

export default header

//  {/* <div className={classes.example1}>
//                 <h3> HOUSPITAL & DIETNATION </h3>
//             </div> */}