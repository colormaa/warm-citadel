import * as types from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const createCart =(cartId)=>dispatch=>{
////console.log("registerUser", regcus)
    
    axios.get('https://backendapi.turing.com/shoppingcart/generateUniqueId')
    .then(res=>{
        ////console.log(res);
       dispatch({
           type: types.CREATE_CART, 
           payload: res.data.cart_id
       })
    })
    .catch(err=>{
        ////console.log(err.response.status);
        //console.log(err.response.data.error);
        dispatch({
            type: types.CREATE_CART, 
            payload: null
        })
    })
    /*
   dispatch({
    type: types.CREATE_CART, 
    payload: cartId
})*/
    
}
export const getCartProducts =(cartid)=>dispatch=>{
    axios.get(`https://backendapi.turing.com/shoppingcart/${cartid}`)
    .then(res =>{
        dispatch({
            type: types.GET_ITEMS_IN_CART, 
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({
            type: types.GET_ITEMS_IN_CART, 
            payload: []
        })
    })
}
export const addProduct =(product)=>dispatch=>{

   console.log("ADd product ", product);
   axios.post('https://backendapi.turing.com/shoppingcart/add', product
   )
   .then(res=>{
       console.log(    "add product to cart", res.data)
       dispatch({type: types.GET_ITEMS_IN_CART, 
        payload: res.data    
    });
   })
   .catch(err=>{
       console.log("add product to car terror", err);
   });

}



export const getTotalAmount =(cartid)=>dispatch=>{
    console.log("getTotalAmount");
    if(cartid){
        axios.get(`https://backendapi.turing.com/shoppingcart/totalAmount/${cartid}`)
        .then(res=>{
            dispatch({
                type: types.CART_TOTAL, 
                payload: res.data.total_amount
            });
        })
        .catch(err=>{
            dispatch({
                type: types.CART_TOTAL, 
                payload: 0.0
            });
        });
    }else{
        dispatch({
            type: types.CART_TOTAL, 
            payload: 0.0
        });
    }
}
export const emptyCart =(cartid)=>dispatch=>{
    axios.post(`https://backendapi.turing.com/shoppingcart/empty/${cartid}`)
    .then(res=>{
        dispatch({
            type: types.EMPTY_CART
        });
    })
    .catch(err=>{
        dispatch({
            type: types.EMPTY_CART
        });
    });
    
}
export const setStatusZero =()=>dispatch=>{
    dispatch({
        type: types.CART_STATUS, 
        payload: 0
    });
}
export const removeItem =(item)=>dispatch=>{
    
    axios.delete(`https://backendapi.turing.com/shoppingcart/removeProduct/${item}`)
    .then(res=>{
        console.log("remove Item is good", res);
        dispatch({
            type: types.CART_STATUS, 
            payload: 1
        });
        
    })
    .catch(err=>{
        console.log("remove Item is good", err);
        dispatch({
            type: types.CART_STATUS, 
            payload: 0
        });
    });
}
export const updateItem = (item)=>dispatch=>{
    console.log("update item ", item);
    axios.put(`https://backendapi.turing.com/shoppingcart/update/${item.item_id}`, {quantity: item.quantity})
    .then(res=>{
        console.log("updateItem is good", res);
        dispatch({
            type: types.CART_STATUS, 
            payload: 1
        });
    })
    .catch(err=>{
        console.log("updateItem is not", err);
        dispatch({
            type: types.CART_STATUS, 
            payload: 0
        });
    });
}
