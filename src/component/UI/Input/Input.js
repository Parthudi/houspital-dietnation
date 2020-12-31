import React from 'react'
import classes from './Input.css'

const Input = (props) => {
    let InputElement = null
    const invalidClas = [classes.InputElement]

    if (props.invalid && props.shouldvalid && props.touched) {
        invalidClas.push(classes.Invalid)
    }

    switch ( props.elementType ) {
            case( 'input' ): 
                    InputElement = <input 
                                        className={invalidClas.join(' ')}        
                                        {...props.elementConfig} 
                                        value={props.value}
                                        onChange={props.changed}  />
                    break;

            case( 'textarea' ):
                    InputElement = <textarea 
                                        className={invalidClas.join(' ')} 
                                        {...props.elementConfig} 
                                        value={props.value}
                                        onChange={props.changed}  />
                    break;
        
            case( 'select' ):
                    InputElement = (<select 
                                        className={invalidClas.join(' ')} 
                                        value={props.value} 
                                        onChange={props.changed}  > 
                                        {props.elementConfig.options.map(option => (
                                          <option key={option.value} value={option.value}>
                                                  {option.displayValue}
                                          </option>
                                                ))}
                                   </select> )
                    break;

            default :
                    InputElement = <input 
                                        className={invalidClas.join(' ')} 
                                        {...props.elementConfig} 
                                        value={props.value}
                                        onChange={props.changed}  />
       }

        return(
            <div className={classes.Input}>
                    <label className={classes.Label}> {props.label} </label>
                    {InputElement}
            </div>
        )
}

export default Input