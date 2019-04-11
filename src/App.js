import React, { Component } from 'react';
import './App.scss';
import Store from './store';
import {Provider, connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import MainPart from './components/MainPart';
import NotFound from './components/NotFound';
import Cart from './components/Cart';
//import PrivateRoute from './utils/PrivateRoute';
import PrivateRoute from 'react-private-route';
import Order from './components/Order';
import Payment from './components/Payment';
import OrderHome from './components/OrderHome';
import Profile from './components/Profile';
import Footer from './components/Footer';
import {showLogin} from './actions/authActions';
import Unauthorized from './components/Unauthorized';

/*
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and is authenticated
  //console.log("decoded ",decoded)
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
*/
class App extends Component {
  render() {
    let route;
    if(this.props.auth.isAuthenticated){
      route =(
        <Switch>
          <Route path = "/order" component = {Order}/>
          <Route path = "/cart" component = {Cart}/>
          <Route path = "/orderhome" component = {OrderHome}/>
          <Route path = "/payment" component = {Payment}/>
          <Route path = "/profile" component = {Profile}/>
          <Route  exact path = "/"  component = {MainPart}/>
          <Route  component = {NotFound}/>
        </Switch>
      );
    }else{
      let str = "/order /cart /orderhome /payment /profile";
     
      let autho = false;
      if(this.props.history.location.pathname !== "/" && str.includes(this.props.history.location.pathname)){
        //this.props.history.push('/');
        console.log("Unauthorize");
        autho = true;
      }
      route = (
      <Switch>
          <Route  exact path = "/"  component = {MainPart}/>
          
          {autho ?<Route  component = {Unauthorized}/>: <Route  component = {NotFound}/>}    
      </Switch>);
    }
    return (
      
            <div className="app">
              {console.log(this.props)}
                <TopBar />
                <Navbar/>
                <div className="app__container">
                  {route}
                </div>
                <Footer />
            </div>
          
      
              
    );
  }
}
const mapStateToProps = state=>({
  auth: state.auth
})
export default connect(mapStateToProps, {showLogin})(withRouter(App));
