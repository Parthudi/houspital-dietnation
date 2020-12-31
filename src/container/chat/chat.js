import React,{Component} from 'react'
import classes from './chat.css'
import {withRouter} from 'react-router-dom'

class Chat extends Component {
    handleOnClick = () => (
        window.location.replace("https://parthudi-chat-app.herokuapp.com/")
    )
    render() {
        return(
            <React.Fragment >
                <div className={classes.chat}>
                   <span className={classes.title}> CHAT WITH DOCTOR </span> <br></br>
                   <span> Here you can have an online conversation with Experts/Doctors</span>
                </div>
                <h1 className={classes.ribbon}>
                   <strong onClick={this.handleOnClick} className={classes.ribboncontent}>Click Me</strong>
                </h1>
            </React.Fragment>  
       )
    }
} 

export default withRouter(Chat)