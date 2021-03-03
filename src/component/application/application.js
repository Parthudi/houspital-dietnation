import React from 'react'
import HealthPredictor from '../../container/healthPredictor/healthPredictor'
import DietPlan from '../../container/dietPlan/dietplan'
import Chat from '../../container/chat/chat'
import "./application.css"

const application = (props) => {
    return(
         <div className="application">
            <HealthPredictor />

            <DietPlan />

            <Chat/>

        </div>
    )
}

export default application