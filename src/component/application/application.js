import React from 'react'
import HealthPredictor from '../../container/healthPredictor/healthPredictor'
import DietPlan from '../../container/dietPlan/dietplan'
import Chat from '../../container/chat/chat'
import classes from "./application.css"

const application = (props) => {
    return(
         <div className={classes.application}>
            <HealthPredictor />

            <DietPlan />

            <Chat/>

        </div>
    )
}

export default application