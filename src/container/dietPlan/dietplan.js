import React,{Component} from 'react'
import classes from './dietPlan.css'
import {withRouter} from 'react-router-dom'
// import diet from "../../assets/images/dietposter.jpg" 

class DietPlan extends Component {
    handleOnClick = () => {
            this.props.history.push('/Dietform')
        }

    render() {
    return(
        <div>
            {/* <div className={classes.menu}>       
                    <div className={classes.background}  style={{backgroundImage:`url(${diet})`}} />
            </div> */}
            <div className={classes.content}>
                        <span className={classes.title}> DIET PLAN </span> <br></br>
                        <h5> Here you can get Diet and Stay Fit/Healthy </h5>
                        <button style={{marginLeft: "0px"}} className={classes.third} onClick={this.handleOnClick}> Diet </button>   
             </div> 
        </div>
        )
    }
}


export default withRouter(DietPlan)