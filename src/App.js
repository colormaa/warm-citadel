import React, { Component } from 'react';
import './App.scss';
import Store from './store';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import MainPart from './components/MainPart';
import {setCurrentUser, showlogin, logoutUser, setToken} from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import Cart from './components/Cart';
import PrivateRoute from './utils/PrivateRoute';
import Order from './components/Order';
import Payment from './components/Payment';
import OrderHome from './components/OrderHome';
import Profile from './components/Profile';
import Footer from './components/Footer';
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and is authenticated
  console.log("decoded ",decoded)
  Store.dispatch(setCurrentUser(decoded));
  //check for expired token 
  const currentTime = Date.now()/1000;
  Store.dispatch(setToken({token:localStorage.jwtToken, customer: decoded}));
  if(decoded.exp < currentTime){
    Store.dispatch(logoutUser())
    //Store.dispatch(clearCurrentUser());
    //clear current user 
    //redirect to login 

    Store.dispatch(showlogin());
  }
}
class App extends Component {
  render() {
    return (
      <Provider store = {Store}>
          <BrowserRouter>
              <div className="App">
                <TopBar />
                <Navbar/>
                <Route  exact path = "/"  component = {MainPart}/>
                <Switch>
                <PrivateRoute exact path = "/cart" component = {Cart}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/order" component = {Order}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/orderhome" component = {OrderHome}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/payment" component = {Payment}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path = "/profile" component = {Profile}/>
              </Switch>
              <Footer />
              </div>
          </BrowserRouter>  
      </Provider>
      
              
    );
  }
}

export default App;
