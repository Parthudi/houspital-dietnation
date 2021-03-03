import React from 'react'
import Header from '../../component/header/header'
import classes from './layout.css'

const Layout = (props) => {
        
    return(
            <div >           
                            <Header />
                            <main className={classes.content}>
                                {props.children}
                            </main>
            </div>
    )
}

export default Layout