import React from 'react'
import Homepage from '../../container/homePage/homePage'
import Navigations from '../navigation/navigation'

const Layout = (props) => {
        
    return(
            <div>          
                <Navigations />    
                        <Homepage />
            </div>
    )
}

export default Layout