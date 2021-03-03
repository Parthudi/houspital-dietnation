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
        error: false,
        loading: false,
        Age: '',
        Height: '',
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
        showOrder: false, 
    }

    handleSubmitHandler = async event => {
            event.preventDefault()  
                const Height = event.target.Height.value
                const Weight = event.target.Weight.value
                const BMI = await (Weight / (Height*Height))
                const fixedBMI = Math.round(BMI)
                this.setState({BMI : fixedBMI , clicked: true, loading: true})

            try{
                await fetch(`http://localhost:4000/user/getbmi/${user._id}`, {
                method: 'POST',
                headers: {
                   "Content-Type" : "application/json",
                   "Authorization" : `Bearer ${token}`
                    },
                body: JSON.stringify({BMI : this.state.BMI})
            })
            // return responseData
        } catch(error) {               
            console.log(error)
          }  

        if( 18.4 < BMI && BMI < 25 ) {
            console.log("entering into congraluations")
            this.setState({ Message : 'Congraluations You Are Just Awesomely Fit & Just Keep doing what you are doing !!!!' }) 

         } else {
            apiDiet(user._id, token).then((data) => {
                if(data.error) {
                        this.setState({error: true})
                 }  else {
                        // console.log("diet plan at form: " + JSON.stringify(data))
                     const {name, morning, breakfast, midmeal, lunch, eveningsnacks, dinner, beforebed} = data[0]
                        
                     this.setState({error:false,background: false, name ,morning, breakfast, midmeal, lunch,
                                      eveningsnacks, dinner, beforebed, loading: false, ShowOrder:true  })
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
        
            <Button btnType={'dietSuccess'} clicked={this.showResult}> Get BMI </Button>
      
        </form> 
    </div>   )
      }
      
    showingorder = () => {
        this.setState({showOrder : true}) 
         }

    closeShowOrder = () => {
        this.setState({showOrder : false})
      }

    showResult = () => {      
         const {name, morning, breakfast, midmeal, lunch, eveningsnacks, dinner, beforebed} = this.state
            return (    
                <div style={{fontFamily:"sans-serif"}}> 
                    <h1 style={{color: "brown"}} > <ul><b> {name.toUpperCase()} </b></ul></h1>
                    <h3 style={{color: "black"}}>  You need to Follow Below Diet  </h3> <br></br>
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
         this.state.loading && ( <Spinner /> )
        )

    render() {          
        return(
            <div>
                {this.showLoading()}
               {!this.state.background   ? 
               
                 <div className="main" style={{textAlign:"center", backgroundColor:"brown"}}>
                     <ShowDietImage  user={user} estyle={{height:"400px", width:"1150px"}} />  
                        <div className="dietplan">  
                            {this.showResult()}
                        </div>
                  </div>
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