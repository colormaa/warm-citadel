import * as  types  from '../actions/types';
//import isEmpty from '../utils/is-empty';
const initialState = {
    cartId: null, 
    total: 0, 
    items: [], 
    status: 0
}
export default function(state = initialState, action){
    //console.log("cart REducer", action.payload);
    switch(action.type){
        case types.CHARGE_SUCCESS: 
        return{
            ...state, 
            cartId: null, 
            total: 0, 
            items: []
        }
        case types.GET_ITEMS_IN_CART: 
        return{
            ...state, 
            items: action.payload
        }
        case types.CART_LOGOUT: 
        return{
            ...state, 
            cartId: null,
		  items: [], 
            total: 0, 
            
        }
        case types.CART_STATUS:
        return{
            ...state, 
            status: action.payload
        }
        case types.CART_TOTAL: 
        return{
            ...state, 
            total: action.payload
        }
         
        case types.CREATE_CART: 
        return{
            ...state, 
            cartId : action.payload
        }
    
       
        
        case types.EMPTY_CART: 
        return{
            ...state, 
            items: [], 
            cartId: null
        }
        default:
        return state;
    }
}