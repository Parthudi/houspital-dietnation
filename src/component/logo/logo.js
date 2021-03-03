import React from 'react'
import houspitalLogo from '../../assets/images/houspitalcroplogo.png'
import classes from './logo.css'

const logo = (props) => {
    return(
            <div className={classes.Logo}>
                <img src={houspitalLogo}  alt="Houspital & Dietnation" style={props.logstyle}/>
            </div>
    )
}

export default logo