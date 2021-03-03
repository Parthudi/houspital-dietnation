import React,{Component} from 'react'
import './chat.css'
import {withRouter} from 'react-router-dom'
import chat from '../../assets/images/chatdoctorposter.jpg'

class Chat extends Component {
     handleOnClick = () => (
        window.location.replace(`https://parthudi-chat-app.herokuapp.com/`)
    )
    render() {
        return(
            <div>
               <div className="menu">       
                        <div className="background"  style={{backgroundImage:`url(${chat})`}} />
               </div>

               <div className="content">
                     <span className="title"> CHAT WITH DOCTOR </span> <br></br>
                     <h5> Here you can have an online conversation with Experts/Doctors</h5>

                  <button style={{margin: "auto"}} className="third" onClick={this.handleOnClick}> CHAT </button>
               </div> 
            </div>
       )
    }
} 

export default withRouter(Chat)