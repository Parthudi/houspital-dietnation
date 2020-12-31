import { Component } from "react";
import React from "react"
import classes from './myprofile.css'
// import Button from '../UI/button/button'

class MYProfile extends Component {

state = {

    error: false,
    message: '',
    upload: null
  }

  handleOnSubmit = async(event) => {
    event.preventDefault()
    // console.log(event.target.parentElement.innerHTML)
        try {
           
            const formdata = new FormData();
          formdata.append("upload" , this.state.upload)
           console.log(event)
            const response =  await fetch("http://localhost:4000/user/profile/upload/5fec036ea264fd5b383f3aec", {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmVjMDM2ZWEyNjRmZDViMzgzZjNhZWMiLCJpYXQiOjE2MDkzOTkwNTB9.N1fd9EjIjgmI1cL4DG_isLYbZAW93TjKoGzs3Fa49uM'
                              },
                          body: JSON.stringify({
                                  upload: this.state.upload
                          })
                      })
                   const responseData = await response.json();
                  
                   console.log(responseData)

            } catch(error) {
                console.log('error ' +error)
                this.setState({ error: true, message: error.message })
              }
            //   this.setState({
            //         upload: ''
            // })
            // if(!this.state.error) {
            //     this.props.history.push('/App')
            // }
    }
  handleOnChange = async(event) => {
    console.log(event.target.files.path)    
    this.setState({ upload : event.target.files[0]  })
    }

  render() {
      return(
        <form className={classes.profile} onSubmit={this.handleOnSubmit}> 
        <input type="file" name='upload'  onChange={this.handleOnChange}  required/><br/>

        {this.state.error ? <span style={{color:'darkred', fontWeight:'bold'}}> {this.state.message} </span> : null  } 

            <button type='submit' > UPLOAD </button>
            </form>
      )
  }
}
export default MYProfile