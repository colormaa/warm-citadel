import * as types from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser =(regcus)=>dispatch=>{
//console.log("registerUser", regcus)
    
    axios.post('https://backendapi.turing.com/customers', regcus)
    .then(res=>{
        //console.log(res);
        const token = res.data.accessToken;
        const customer = jwt_decode(token);
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        dispatch(setProductFromSaved());
        dispatch(setCurrentUser(customer));
        dispatch(setToken({token: token, customer: customer}));
        dispatch({
            type: types.HIDE_LOGIN
        })
    })
    .catch(err=>{
        //console.log(err.response.status);
        console.log(err.response.data.error);
        dispatch({
            type: types.GET_ERRORS, 
            payload: err.response.data.error
        })
    })
    
}
export const facebookLogin=(fb)=>dispatch=>{
    axios.post('https://backendapi.turing.com/customers/facebook', fb.accessToken)
    .then(res=>{
        console.log("facebook login success", res);
        const token = res.data.accessToken;
        const customer = jwt_decode(token);
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        dispatch(setProductFromSaved());
        dispatch(setCurrentUser(customer));
        dispatch(setToken({token: token, customer: customer}));
        dispatch({
            type: types.HIDE_LOGIN
        })
    })
    .catch(err=>{
        console.log("facebook login ", err);
        console.log("facebook login ", err.response.data);
        console.log("facebook login ", err.response);
    })
}
export const setToken =(token)=>dispatch=>{
    dispatch({type: types.SET_TOKEN, 
    payload: token
    });
};

export const loginUser =(regcus)=>dispatch=>{
    //console.log("logiNUser", regcus);
    axios.post('https://backendapi.turing.com/customers/login', regcus)
    .then(res=>{
       // console.log(res);
        const token = res.data.accessToken;
        const customer = jwt_decode(token);
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        dispatch(setProductFromSaved())
        dispatch(setCurrentUser(customer));
        dispatch({
            type: types.HIDE_LOGIN
        })
        
    })
    .catch(err=>{
        console.log(err.response.data.error);
        dispatch({
            type: types.GET_ERRORS, 
            payload: err.response.data.error
        })
    })

}
export const setPath =(path)=>dispatch=>{
    dispatch({
        type: types.SET_PATH, 
        payload: path
    })
}
export const setCurrentUser =(customer)=>{
    return{
        type: types.SET_CURRENT_USER, 
        payload: customer
    }
}
export const logoutUser =()=>dispatch =>{
    //remove token from local storage 
    localStorage.removeItem("jwtToken");
    //remove auth  header for future requests 
    setAuthToken(false);

    //set current user to null and isAuthenticated equals = false 
   dispatch(setCurrentUser({}));
   dispatch({
        type: types.HIDE_LOGIN
    })  
}
export const showLogin=()=>dispatch=>{
    dispatch(showlogin());
}
export const showlogin =()=>{
    return{
        type: types.SHOW_LOGIN
    }
}
export const setProductFromSaved =()=>{
    return{
        type: types.SET_PRODUCT_FROM_SAVED
    }
}