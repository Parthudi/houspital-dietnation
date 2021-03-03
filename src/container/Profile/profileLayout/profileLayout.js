import React from 'react'
import './profileLayout.css'

const ProfileLayout = (props) => {
    return(
        <div>
            <div className="jumbotron">
                <h2> {props.title} </h2>
                <p className="lead"> {props.description} </p>
            </div>

            <div className={props.className}>
                {props.children}
            </div>
        </div>
    )
}

export default ProfileLayout