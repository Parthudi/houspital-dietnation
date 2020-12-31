import React, { Component } from 'react';
import classes from './App.css';
import {Route, Switch} from 'react-router-dom'     
import Signup from './container/signup/signup'
import Signin from './container/signin/signin'
import Homepage from './container/homePage/homePage'
import Application from './component/application/application'
import Dietform from './container/dietPlan/dietForm/dietform'
import Profile from './component/profilepic/profile'

class App extends Component {
  render() {
        
    return (
      <React.Fragment>
        <div className={classes.App}>
            <Switch>

              <Route path='/Signup'  component={Signup}/> 
              <Route path='/Signin'  component={Signin}/> 
              <Route path='/App' component={Application} />
              <Route path='/Dietform' component={Dietform} />
              <Route path='/Profile' component={Profile} />
              <Route path='/'  component={Homepage}/>

            </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
