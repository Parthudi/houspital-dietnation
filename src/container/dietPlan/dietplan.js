import React,{Component} from 'react'
import './dietPlan.css'
import {withRouter} from 'react-router-dom'
import diet from "../../assets/images/dietposter.jpg" 

class DietPlan extends Component {
    handleOnClick = () => {
            this.props.history.push('/Dietform')
        }

    render() {
    return(
        <div>
            <div className="menu">       
                    <div className="background"  style={{backgroundImage:`url(${diet})`}} />
            </div>
            <div className="content">
                        <span className="title"> DIET PLAN </span> <br></br>
                        <h5> Here you can get Diet and Stay Fit/Healthy </h5>
                        <button style={{marginLeft: "0px"}} className="third" onClick={this.handleOnClick}> Diet </button>   
             </div> 
        </div>
        )
    }
}


export default withRouter(DietPlan)