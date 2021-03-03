import React, { Component } from 'react'
import classes from './Modal.css'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
            return ( nextProps.showback !== this.props.showback || nextProps.children !== this.props.children )
        }

    render() {
        return(
            <Auxiliary>
            <Backdrop show={this.props.showback} clicked={this.props.modalClosed}/>
                <div className={classes.Modal} 
                    style={{
                        transform: this.props.showback ? 'translateY(0)' : 'translateY(-50vh)',
                        opacity  : this.props.showback ?  '1' : '0'
                       }}>
                        {this.props.children}
                </div>


        </Auxiliary>

        )
    }
}  

export default  Modal