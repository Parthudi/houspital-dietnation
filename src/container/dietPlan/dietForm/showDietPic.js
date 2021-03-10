import React from 'react'

const ShowDietImage = (props) => {
    
    var DietPic = `http://localhost:4000/user/dietpic/${props.user._id}`
    return(
    <div>
        <img src={DietPic} alt={props.user.userName} style={props.estyle} />
    </div>
    )
  }

export default ShowDietImage
