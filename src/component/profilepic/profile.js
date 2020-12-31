import { Component } from "react";
import React from "react"
import classes from './profile.css'
import Avatar from '../upload/avatar'
// import Photo from '../images/profile.jpg'
import Button from '../UI/button/button'

class Profile extends Component {

    // state = {
    //     upload: '',
    //     error: false,
    //     message:''
    // }
    constructor(props) {
        super(props)
     
        this.state = {
          preview: null,
          error: false,
          message: '',
          upload: ''
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
      }
      
      onClose() {
        this.setState({preview: null})
      }
      
      onCrop(preview) {
        this.setState({preview})
      }
    
      onBeforeFileLoad(elem) {     
         console.log(elem.target.files[0].name)
        if(elem.target.files[0].size > 716800){
          alert("File is too big!");
          elem.target.value = "";
        };
    }   

    handleonSubmit = async event => {
      event.preventDefault()
      console.log(event.target.file)
          try {
              // if(this.state.preview === null) {
              //     console.log('error')
              //     throw new Error('please upload again')
              //     }
              const formdata = new FormData();
             formdata.append("upload" , this.state.upload)
              const response =  await fetch("http://localhost:4000/user/profile/upload", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmVjMDM2ZWEyNjRmZDViMzgzZjNhZWMiLCJpYXQiOjE2MDkzMTg5Mjl9.DEjlmn7BTBk8gakqdvVlRh1d-PP-iduVUBM0TPUrYlw'
                                },
                            body: JSON.stringify({
                                    upload : this.state.upload
                            })
                        })
                     const responseData = await response.json();
                    
                     console.log(responseData)
  
              } catch(error) {
                  console.log('error ' +error)
                  this.setState({ error: true, message: error.message })
                }
                this.setState({
                      preview: null,
                      upload: ''
              })
              if(!this.state.error) {
                  this.props.history.push('/App')
              }
      
           }

        skipHandler = () => {
            this.props.history.push('/App')
          }

          handleonchange = (event) => {   
            this.setState({ upload : event.target.files[0]  })            
            }

    render() {
        
        return(
            <React.Fragment>
                 <p className={classes.text}> <b>Adjust your image here <strong> &darr; </strong></b></p>
                <form className={classes.profile} onSubmit={this.handleonSubmit}>       
                    <Avatar
                          width={390}
                          height={285}
                          onCrop={this.onCrop}
                          onClose={this.onClose}
                          onBeforeFileLoad={this.onBeforeFileLoad}  
                          valv={this.state.upload}
                          onChange={this.handleonchange}/>    
                          
                    <Button btnType={'formSuccessHomepage'} type='submit' clicked={this.handleonSubmit}> UPLOAD </Button>
                </form>

                {this.state.error ? <span style={{color:'darkred', fontWeight:'bold'}}> {this.state.message} </span> : null  } 

                <div className={classes.img}>
                    <img src={this.state.preview} alt=''  />  <br></br><br></br><br></br>
                   
                
                  <Button btnType={'formDangerHomepage'}  clicked={this.skipHandler}> SKIP </Button>   
                  
                </div>  
                {/* <form onSubmit={this.handleonSubmit}> 
                <input type="file" name='upload'  value={this.state.upload} onChange={this.handleonchange}  required/><br/>

                    <button type='submit' > UPLOAD</button>
                    </form>
                    {/* <Button btnType={'formSuccessHomepage'} > UPLOAD </Button> */}
                    {/* <Button btnType={'formDangerHomepage'}  clicked={this.skipHandler}> SKIP </Button>   */} 
               

            </React.Fragment>
        )
    }
}
    
export default Profile



 //{/* <input type="file" name="upload" value={this.state.file} onChange={this.OnHandleChange} accept="image/x-png,image/jpg,image/jpeg" /> */}