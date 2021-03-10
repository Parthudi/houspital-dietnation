import React, { Fragment } from 'react'
import HealthPredictor from '../../container/healthPredictor/healthPredictor'
import DietPlan from '../../container/dietPlan/dietplan'
import Chat from '../../container/chat/chat'
import Footer from '../footer/footer'
import "./application.css"

const application = (props) => {
    return(
        <Fragment>
         <div className="application">
            <HealthPredictor />

            <DietPlan />

            <Chat/>
        </div>

        <hr /> <br></br>
         <Footer/>  <br></br>
        </Fragment>
    )
}

export default application