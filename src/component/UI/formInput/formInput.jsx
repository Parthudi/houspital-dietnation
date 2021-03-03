import React from 'react'
import classes from './formInput.css'

const FormInput = (props) => {
    //console.log(props.labal)
   // console.log('length: ' +props.value.length)

   const formlabel = (
         props.labletype ? classes.labletype : classes.forminputlabel
       
   )
    return(                     
        <div className={classes.group}>
            <input className={classes.forminput} onChange={props.handleChange} autoComplete="off" {...props}/>
            {
               props.labal ? 
               ( <label className={`${props.value.length  ? [classes.shrink ] : ''}  ${formlabel}`}>
               {props.labal}
             </label> ) : null
            }
        </div>      
    )
}


export default FormInput

// ${[classes.forminputlabel, classes[props.lableType]].join(' ')}`}