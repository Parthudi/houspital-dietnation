import React from 'react'
import HealthPredictor from '../../container/healthPredictor/healthPredictor'
import DietPlan from '../../container/dietPlan/dietplan'
import Chat from '../../container/chat/chat'
import classes from "./application.css"

const application = (props) => {
    return(
        <React.Fragment>
         <div className={classes.application}>
            <HealthPredictor />

            <DietPlan />

            <Chat />
        </div>
        </React.Fragment>
    )
}

export default application