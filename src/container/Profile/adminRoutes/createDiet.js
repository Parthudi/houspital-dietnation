import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../../serverApi/authApi'
import Button from '../../../component/UI/button/button'
import './createDiet.css'

const CreateDiet = (props) => {
    const {user , token} = isAuthenticated()

    const [values, setValues] = useState({
            name: '',
            morning: '',
            midmeal: '',
            min: '',
            max: '',
            eveningsnacks: '',
            beforebed: '',
            breakfast: '',
            lunch: '',
            dinner: '',
            loading: false,
            error: '',
            formData: '',
            });

    const { name, morning, midmeal, eveningsnacks, beforebed, breakfast, 
                lunch, dinner, error, formData } = values ;

        useEffect(() => {
            setValues({ formData : new FormData() }) ;
         }, [])

    const handleonchange = name => event => {
            const value =name === "dietpic" ? event.target.files[0] : event.target.value
            formData.set(name, value)
            setValues({...values, [name] : value})  
        }

    const handleonSubmit = async event  => {
        event.preventDefault()

        try {
            setValues({loading: true, error: ""})
            await fetch(`http://localhost:4000/user/creatediet/${user._id}`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            "Authorization" : `Bearer ${token}`
                            },
                          body: formData
                          }).then(response => response.json() )
                  
            setValues({...values,   name: '', morning: '',midmeal: '',min: '',max: '', eveningsnacks: '',
                        beforebed: '', breakfast: '',lunch: '',dinner: '',loading: false, error: '',formData: '', })
          } catch(error) {
              setValues({ ...values, error: error})
              }
    }

    const userFormData = () => {
        return ( <form className="mb-7" onSubmit={handleonSubmit}>
                <div className="form-group"> 
                        <label className="text-muted"> Name </label>
                        <select  onChange={handleonchange("name")} className="form-control" > 
                            <option value=""> --Select any one-- </option>
                            <option value="Skinny"> Skinny </option>
                            <option value="OverWeighted"> OverWeighted </option>
                            <option value="Excessive OverWeighted"> Excessive OverWeighted </option>
                        </select>                                            
                    </div>
                    <div className="form-group"> 
                        <label className="text-muted"> Morning </label>
                        <input type="text" onChange={handleonchange('morning')}  value={morning|| ''} className="form-control" required/>                                            
                    </div>
                    <div className="form-group"> 
                        <label className="text-muted"> Breakfast </label>
                        <input type="text" onChange={handleonchange('breakfast')}  value={breakfast|| ''} className="form-control" required/>                                            
                    </div>
                    <div className="form-group"> 
                        <label className="text-muted"> Midmeal </label>
                        <input type="text" onChange={handleonchange('midmeal')}  value={midmeal|| ''} className="form-control" required/>                                            
                    </div>
                    <div className="form-group"> 
                        <label className="text-muted"> Lunch </label>
                        <input type="text" onChange={handleonchange('lunch')}  value={lunch|| ''} className="form-control" required/>                                            
                    </div>
                    <div className="form-group"> 
                        <label className="text-muted"> EveningSnacks </label>
                        <input type="text" onChange={handleonchange('eveningsnacks')}  value={eveningsnacks|| ''} className="form-control" required/>                                            
                    </div>
                    <div className="form-group"> 
                        <label className="text-muted"> Dinner </label>
                        <input type="text" onChange={handleonchange('dinner')}  value={dinner|| ''} className="form-control" required/>                                            
                    </div>
                    <div className="form-group"> 
                        <label className="text-muted"> BeforeBed </label>
                        <input type="text" onChange={handleonchange('beforebed')}  value={beforebed|| ''} className="form-control" required/>                                            
                    </div>

            <div className="form-group"> 
                        <label className="text-muted"> Min BMI </label>
                        <select  onChange={handleonchange("min")} className="form-control" > 
                            { name && name==="Skinny" ? <option value="1"> 1 </option> : null }
                            { name && name==="OverWeighted" ? <option value="25"> 25 </option> : null }
                            { name && name==="Excessive OverWeighted" ? <option value="40"> 40 </option> : null }
                        </select>                                            
                </div>
            
            <div className="form-group"> 
                        <label className="text-muted"> Max BMI </label>
                        <select onChange={handleonchange("max")} className="form-control" > 
                            { name && name==="Skinny" ? <option value="18"> 18 </option> : null }
                            { name && name==="OverWeighted" ? <option value="39"> 39  </option> : null }
                            { name && name==="Excessive OverWeighted" ? <option value="120"> 120 </option> : null }
                        </select>                                            
                </div>
            <div className="form-group"> 
                        <label className="btn btn-secondary">
                            <input type="file"  onChange={handleonchange('dietpic')}  name="dietpic" accept="image/*" required/> 
                        </label>                      
                </div>
    
            <Button btnType={'formSuccessHomepage'} ><h3> SET DIET </h3></Button>
     </form> )
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "" : 'none' }}> {error} </div>
        )
 
    return(
        <React.Fragment>
            <div className="col-md-10 offset-md-1">
            <h2 style={{padding:'20px', color: 'gray'}}><u><b> CREATE DIET </b></u></h2>
                {showError()}
                {userFormData()}
            </div>    
        </React.Fragment>
        )
    }

export default CreateDiet