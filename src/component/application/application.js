import React from 'react'
import HealthPredictor from '../../container/healthPredictor/healthPredictor'
import DietPlan from '../../container/dietPlan/dietplan'
import Chat from '../../container/chat/chat'

const application = (props) => {
    return(
        <React.Fragment>

            <HealthPredictor />

            <Chat />

            <DietPlan />

          

        </React.Fragment>
    )
}

export default application