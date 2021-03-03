import React,{Component} from 'react'
import classes from './chat.css'
import {withRouter} from 'react-router-dom'
import chat from '../../assets/images/chatdoctorposter.jpg'

class Chat extends Component {
     handleOnClick = () => (
        window.location.replace(`https://parthudi-chat-app.herokuapp.com/`)
    )
    render() {
        return(
            <div>
               <div className={classes.menu}>       
                        <div className={classes.background}  style={{backgroundImage:`url(${chat})`}} />
               </div>

               <div className={classes.content}>
                     <span className={classes.title}> CHAT WITH DOCTOR </span> <br></br>
                     <h5> Here you can have an online conversation with Experts/Doctors</h5>

                  <button style={{margin: "auto"}} className={classes.third} onClick={this.handleOnClick}> CHAT </button>
               </div> 
            </div>
       )
    }
} 

export default withRouter(Chat)