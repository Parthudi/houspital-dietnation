import React,{Component} from 'react'
import classes from './healthPredictor.css'
// import prediction from "../../assets/images/healthpredictionsposter.png" 

class Healthpredictor extends Component {

    handleOnClick = () => {
        this.props.history.push('./App/Healthpredictor')
        }

    render() {

        return(
            <div>
                {/* <div className={classes.menu}>       
                        <div className={classes.background}  style={{backgroundImage:`url(${prediction})`}} />
                </div> */}
                <div className={classes.content}>
                    <span className={classes.title}> HEALTH PREDICTOR </span> <br></br>
                    <h5> Here you can predict your Problems/Diseases  </h5>
                    <button style={{margin: "auto"}} className={classes.third}> Health </button>   
                </div> 
            </div>
            )
      }
   
}
export default Healthpredictor