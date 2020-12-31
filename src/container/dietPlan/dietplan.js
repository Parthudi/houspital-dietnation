import React,{Component} from 'react'
import classes from './dietPlan.css'
import {withRouter, Route} from 'react-router-dom'
import Dietform from './dietForm/dietform'

class DietPlan extends Component {
    handleOnClick = () => {
            this.props.history.push('/Dietform')
        }
    render() {
   
    return(
         <React.Fragment >
             <div className={classes.diet}>
                <span className={classes.title}> DIET PLAN </span> <br></br>
                <span> Here you can get Diet and Stay Fit/Healthy </span>
             </div>
             <h1 className={classes.ribbon}>
                <strong onClick={this.handleOnClick} className={classes.ribboncontent}>Click Me</strong>
             </h1>

            <Route path={this.props.match.path + '/Dietform'} component={Dietform}  />
         </React.Fragment>

        )
    }
}


export default withRouter(DietPlan)