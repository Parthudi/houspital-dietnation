import React, {Component} from 'react'
import cartoon from './audio/cartoon.mp3'
import {Howl, Howler} from 'howler'
import './footer.css'
  
class Boot extends Component  {
    Soundplay = (src) => {
        const sound = new Howl({
            src
        })
        sound.play();
    }

    render() {
    
        Howler.mute(false)
        Howler.volume(1)

         return (
            <div className= " text-center center-block ">

                <a onClick={()=> this.Soundplay(cartoon)} href="https://www.facebook.com/parth.parmar.3745496" className="fa fa-facebook"> </a> 
                <a onClick={()=> this.Soundplay(cartoon)} href="https://twitter.com"  className="fa fa-twitter"> </a>
                <a onClick={()=> this.Soundplay(cartoon)} href="https://www.google.com/search/contributions"  className="fa fa-google"> </a>
                <a onClick={()=> this.Soundplay(cartoon)} href="https://www.linkedin.com/in/parth-parmar-903136177"  className="fa fa-linkedin"> </a>
                <a onClick={()=> this.Soundplay(cartoon)} href="https://www.instagram.com/parth___thehuman"  className="fa fa-instagram"> </a>
                <a onClick={()=> this.Soundplay(cartoon)} href="https://www.snapchat.com" className="fa fa-snapchat-ghost"> </a>
                <a onClick={()=> this.Soundplay(cartoon)} href="https://secure.skype.com/portal/overview" className="fa fa-skype"> </a>
                
            </div>
    
        )
    }
}

  
export default Boot