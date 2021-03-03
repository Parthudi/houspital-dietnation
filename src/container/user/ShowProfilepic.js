import React from 'react'

const ShowImage = (props) => {
    
    var Profile = `http://localhost:4000/user/photo/${props.user._id}`
    return(
    <div>
        <img src={Profile} alt={props.user.userName} style={props.estyle}/>
    </div>
    )
  }

export default ShowImage
