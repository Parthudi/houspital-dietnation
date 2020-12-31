import React,{Component} from 'react'
import classes from './healthPredictor.css'

class Healthpredictor extends Component {
    handleOnClick = () => {
        this.props.history.push('./App/Healthpredictor')
        }
    render() {
        return(
            <React.Fragment >
                <div className={classes.predictor}>
                   <span className={classes.title}> HEALTH PREDICTOR </span> <br></br>
                   <span> Here you can predict your Problems/Diseases  </span>
                </div>
                <h1 className={classes.ribbon}>
                       <strong onClick={this.handleOnClick} className={classes.ribboncontent}>Click Me</strong>
                </h1>
            </React.Fragment>
   
       )
    }
}

export default Healthpredictor