import React, { Component } from 'react'
import FormInput from '../../../component/UI/formInput/formInput'
import Button from '../../../component/UI/button/button'
import './dietform.css'
import Spinner from '../../../component/UI/Spinner/Spinner'
import ShowDietImage from '../dietForm/showDietPic'
import {isAuthenticated} from "../../serverApi/authApi"
import {apiDiet} from "./apidiet"

const {user , token} = isAuthenticated()

class Dietform extends Component {
      
    state = {
        error: '',
        loading: false,
        Age: '21',
        Height: '1.9',
        Weight: '',
        Message: '',
        BMI: '',
        clicked: false,
        background: true,
        name: "",
        morning: "",
        breakfast: "",
        midmeal: "",
        lunch: "",
        eveningsnacks: "",
        dinner: "",
        beforebed: "", 
        perfect: false
    }

    handleSubmitHandler = async event => {
            event.preventDefault()  
                const Height = event.target.Height.value
                const Weight = event.target.Weight.value
                const BMI = await (Weight / (Height*Height))
                const fixedBMI = Math.round(BMI)
                this.setState({BMI : fixedBMI , loading: true,name: "",morning: "",breakfast: "",
                midmeal: "", lunch: "", eveningsnacks: "", dinner: "", beforebed: "" })

            try{
                await fetch(`http://localhost:4000/user/getbmi/${user._id}`, {
                method: 'POST',
                headers: {
                   "Content-Type" : "application/json",
                   "Authorization" : `Bearer ${token}`
                    },
                body: JSON.stringify({BMI : this.state.BMI})
            })
        } catch(error) {               
            console.log({error: error})
          }  

        if( 18.4 < BMI && BMI < 25 ) {
            console.log("entering into congraluations")
            this.setState({ Message : 'Congraluations You Are Just Awesomely Fit & Just Keep doing what you are doing !!!!' ,
                            perfect: true, error:"", background: false, loading: false, ShowOrder:true }) 

         } else {
            apiDiet(user._id, token).then((data) => {
                if(data.error) {
                        this.setState({error: data.error, loading: false})
                 }  else {
                        console.log("diet plan at form: " + JSON.stringify(data))
                     const {name, morning, breakfast, midmeal, lunch, eveningsnacks, dinner, beforebed} = data[0]
                        
                     this.setState({error:"",background: false, name ,morning, breakfast, midmeal, lunch,
                                      eveningsnacks, dinner, beforebed, loading: false, ShowOrder:true })
                     }   })   
              }        
        }

    OnHandleChange = (event) => {
        this.setState({ [event.target.name] : [event.target.value]})
        }

    formData = () => {
       return( 
       <div>
            <h2> BODY MASS INDEX FORM</h2>
        <form onSubmit={this.handleSubmitHandler} >
                    
            <FormInput  type="number" name='Age' labal='your age'  value={this.state.Age}  onChange={this.OnHandleChange} labletype='true' min='20' required  /> 
       
            <FormInput  type="number" name='Height' labal='height(m)'  value={this.state.Height}  onChange={this.OnHandleChange} labletype='true'  required  />

            <FormInput  type="number" name='Weight' labal='weight(kg)'  value={this.state.Weight}  onChange={this.OnHandleChange} labletype='true' required  /> 
        
         <center> <Button btnType={'dietSuccess'} clicked={this.showResult}> <h3> Get BMI </h3></Button> </center>
      
        </form> 
    </div>   )
      }

    showResult = () => {      
         const {name, morning, breakfast, midmeal, lunch, eveningsnacks, dinner, beforebed} = this.state
            return (  
                <div style={{fontFamily:"sans-serif", alignItems:"start"}}> 
                  <center> <h1 style={{color: "brown"}} > <ul><b> {name.toUpperCase()} </b></ul></h1>
                    <h3 style={{color: "black"}}>  You need to Follow Below Diet  </h3> <br/><br/><br/>  </center>
                    <h2 style={{color: "purple"}}> <strong style={{color:"grey", textTransform:"capitalize"}}>  <u>Morning</u> </strong>  </h2>  <h4> <ul> {morning} </ul></h4>
                    <h2 style={{color: "purple"}}> <strong style={{color:"grey"}}>  <u>Breakfast</u> </strong> </h2> <h4> <ul>  {breakfast} </ul> </h4>
                    <h2 style={{color: "purple"}}> <strong style={{color:"grey"}}>  <u>MidMeal</u> </strong>   </h2>  <h4><ul>  {midmeal}  </ul></h4>
                    <h2 style={{color: "purple"}}> <strong style={{color:"grey"}}>  <u>Lunch</u> </strong>     </h2>     <h4> <ul>  {lunch}  </ul></h4>
                    <h2 style={{color: "purple"}}> <strong style={{color:"grey"}}>  <u>Evening Snacks</u> </strong> </h2> <h4> <ul> {eveningsnacks} </ul>  </h4>
                    <h2 style={{color: "purple"}}> <strong style={{color:"grey"}}>  <u>Dinner</u> </strong>  </h2>       <h4> <ul>  {dinner}  </ul> </h4>
                    <h2 style={{color: "purple"}}> <strong style={{color:"grey"}}>  <u>Before Bed</u> </strong>  </h2>   <h4> <ul>  {beforebed} </ul> </h4>              
                 </div>
            )}

    showLoading = () =>  (
         this.state.loading ?  <Spinner /> : null 
         )
        
    render() {          
        return(
            <div>
                {this.showLoading()}
               {!this.state.background   ? 

                  (this.state.perfect ? 
                     <h1>  <center style={{marginTop:"5%",color:"grey"}}>   {this.state.Message}  </center> </h1> :
                 (<div> 
                <center> <ShowDietImage  user={user} estyle={{height:"400px", width:"1510px",marginTop:"20px"}} /> </center>
                        <div className="dietplan">  
                            {this.showResult()}
                        </div>
                  </div>) )

                  : (
                    <div className="dietform"> 
                        {this.state.clicked ? this.showResult() : this.formData()}            
                     </div>              
                )}    
            </div>
        )
    }
}

export default Dietform