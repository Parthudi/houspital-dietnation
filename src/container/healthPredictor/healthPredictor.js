import React,{Component} from 'react'
import './healthPredictor.css'
import prediction from "../../assets/images/healthpredictionsposter.png" 

class Healthpredictor extends Component {

    handleOnClick = () => {
        this.props.history.push('./App/Healthpredictor')
        }

    render() {

        return(
            <div>
                <div className="menu">       
                        <div className="background"  style={{backgroundImage:`url(${prediction})`}} />
                </div>
                <div className="content">
                    <span className="title"> HEALTH PREDICTOR </span> <br></br>
                    <h5> Here you can predict your Problems/Diseases  </h5>
                    <button style={{margin: "auto"}} className="third"> Health </button>   
                </div> 
            </div>
            )
      }
   
}
export default Healthpredictor