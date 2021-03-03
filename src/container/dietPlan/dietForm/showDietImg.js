import React from 'react'

const ShowImage = (props) => {

    var IMG = `http://localhost:4000/user/getdiet/602789611092ee90a07548bb`
    return(
    <div className="product-img">
        <img src={IMG} alt={props.product.name} className="mb-3" style={{maxHeight:"100%", maxWidth:"100%"}}/>
    </div>
    )
  }

export default ShowImage