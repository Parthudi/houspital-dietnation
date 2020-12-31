import React, { Component } from 'react'
import FormInput from '../../../component/UI/formInput/formInput'
import Button from '../../../component/UI/button/button'
import classes from './dietform.css'

class Dietform extends Component {

    state = {
        Age: '',
        Height: '',
        Weight: ''
    }

    OnHandleChange = (event) => {
        this.setState({ [event.target.name] : [event.target.value]})
        }

    render() {
        return(
            <React.Fragment >
                <div className={classes.dietform}>
                <h2> BODY MASS INDEX FORM</h2>
                <form >
                    
                    <FormInput  type="text" name='Age' labal='your age'  value={this.state.Age}  onChange={this.OnHandleChange} lableType required  /> 
                   
                    <FormInput  type="text" name='Height' labal='height(m)'  value={this.state.Height}  onChange={this.OnHandleChange} lableType required  />

                    <FormInput  type="text" name='Weight' labal='weight(kg)'  value={this.state.Weight}  onChange={this.OnHandleChange} lableType required  /> 
                    <Button btnType={'dietSuccess'}> Get BMI </Button>
                </form>
                </div>   
            </React.Fragment>
        )
    }
}

export default Dietform