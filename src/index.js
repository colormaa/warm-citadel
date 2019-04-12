
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {setCurrentUser, showlogin, logoutUser, setToken} from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';

console.log = console.war= console.error = ()=>{};

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
      console.log(" login index show login");
  
      Store.dispatch(showlogin());
    }
  }
const app = (
    <Provider store = {Store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
