import * as types from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const createCart =()=>dispatch=>{
//console.log("registerUser", regcus)
    
    axios.get('https://backendapi.turing.com/shoppingcart/generateUniqueId')
    .then(res=>{
        //console.log(res);
       dispatch({
           type: types.CREATE_CART, 
           payload: res.data.cart_id
       })
    })
    .catch(err=>{
        //console.log(err.response.status);
        console.log(err.response.data.error);
        dispatch({
            type: types.CREATE_CART, 
            payload: null
        })
    })
    
}
export const addProduct =(product, totalprice)=>dispatch=>{
    //console.log("registerUser", regcus)
    console.log("ADd product", product);
    dispatch({
        type: types.ADD_PRODUCT, 
        payload: {product: product, total: totalprice}
    });       
}

export const addQuantityProduct =(product, totalprice)=>dispatch=>{
    //console.log("registerUser", regcus)
    console.log(" add quantity product", product, totalprice);
    dispatch({
        type: types.ADD_QUANTITY_PRODUCT, 
        payload: {product: product, total: totalprice}
    });       
}

export const removeProduct =(product, total)=>dispatch=>{
    //console.log("registerUser", regcus)
    console.log("remove product", product, total);
    dispatch({
        type: types.CART_REMOVE_PRODUCT, 
        payload: {product:product, total: total}
    });       
}
export const emptyCart =()=>dispatch=>{
    dispatch({
        type: types.EMPTY_CART
    });
}
export const addProductToCart =(payload, header)=>dispatch=>{
    console.log("ADD product to cart  ", payload, header)
    axios.post('https://backendapi.turing.com/shoppingcart/add', payload, 
    {headers:header
    }
    )
    .then(res=>{
        console.log(
            "add product to cart", res.data
        )
    })
    .catch(err=>{
        console.log("add product to car terror");
    });
}
