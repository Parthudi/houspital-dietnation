import React, { Component, Suspense } from 'react';
import classes from './App.css';
import {Route, Switch} from 'react-router-dom'     
import Signup from './container/user/signup/signup'
import Signin from './container/user/signin/signin'
import Homepage from './container/homePage/homePage'
import CreateDiet from './container/Profile/adminRoutes/createDiet'
import Layout from './component/layout/layout'
import AdminRoute from './container/serverApi/AdminRoute'
import Spinner from './component/UI/Spinner/Spinner'
import AdminDashboard from './container/Profile/adminUser/adminHome'

const Application =   React.lazy(() => import('./component/application/application'))
const Dietform =      React.lazy(() => import('./container/dietPlan/dietForm/dietform'))
const UserDashboard = React.lazy(() => import('./container/Profile/userProfile/userHome'))


class App extends Component {
  render() {
    let routes = (
      <Switch>
              <Route path='/signup'   component={Signup}/> 
              <Route path='/signin'   component={Signin}/> 
              <Route path='/user/app' exact  render={() => (
                 <Suspense fallback= {<Spinner />}>
                    <Application /> 
                 </Suspense> )} />
             
              <Route path='/dietform' exact render={() => (
                 <Suspense fallback= {<Spinner />}>
                    <Dietform /> 
                 </Suspense> )} /> 

              <Route path='/dashboard' exact render={() => (
                 <Suspense fallback= {<Spinner />}>
                    <UserDashboard /> 
                 </Suspense> )} />

              <AdminRoute   path='/admin/dashboard' exact component={AdminDashboard} />
              <AdminRoute   path='/create/diet' exact component={CreateDiet} />

              <Route path='/'  component={Homepage}/>
              
        </Switch>
      )
      // <Route path='/shop' exact  render={() => (
      //   <Suspense fallback= {<h1> Loading.... </h1>}>
      //       <ShopPage /> 
      //   </Suspense>
      //   )} />

      // <Route path='/login' exact render={() => (
      //   <Suspense fallback= { <h1> Loading.... </h1>}>
      //       <SignInAndSignUp /> 
      //   </Suspense>
      //   )} />  
    return (
      <React.Fragment>
        <Layout className={classes.App}>
                {routes}
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
