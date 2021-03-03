import React from 'react'
import classes from './header.css'
import Logo from '../logo/logo'
import Menu from '../headerRoutes/headerRoutes'

const header = (props) => {

    return(          
        <header className={classes.Toolbar}>
            <div className={classes.Logo} >
                <Logo />
            </div> 
            <div className={classes.showright}> 
                <Menu />     
            </div>
            {/* <div className={classes.example1}>
                <h3> HOUSPITAL & DIETNATION </h3>
            </div> */}
            
        </header>   
    
    )
}

export default header

