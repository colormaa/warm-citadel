import * as  types  from '../actions/types';
//import isEmpty from '../utils/is-empty';
const initialState = {
    countries: [], 
    shippingregion: [], 
    tax: [], 
    orderId: 0, 
    orders: [], 
    order: null, 
    status: 1, 
    orderdetails: [], 
    shipping: [], 
    error:null
}
export default function(state = initialState, action){
    switch(action.type){
        case types.ORDER_DETAIL: 
        return{
            ...state, 
            
        }
        case types.CHARGE_ERROR: 
        return{
            ...state, 
                error: action.payload
        }
        case types.CHARGE_SUCCESS: 
        return{
            ...state, 
                orderId: 0, 
                orders: [], 
                order: null , 
                orderdetails: []
        }
        case types.GET_COUNTRIES: 
            return {
                ...state, 
                countries: action.payload
            }
            case types.ORDER_LOGOUT: 
            return{
                ...state, 
                orderId: 0, 
                orders: [], 
                order: null , 
                orderdetails: []
            }
            case types.GET_SHIPPING: 
            return{
                ...state, 
                shipping: action.payload
            }
            case types.GET__ORDER__DETAIL:
            return{
                ...state, 
                orderdetails:action.payload
            }
            case types.GET_SHIPPING_REGION: 
            return {
                ...state, 
                shippingregion: action.payload
            }
            case types.GET_ORDERS: 
            return{
                ...state, 
                orders: action.payload
            }
            case types.GET_TAX: 
            return {
                ...state, 
                tax: action.payload
            }
            case types.CREATE_ORDER: 
            return {
                ...state, 
                orderId: action.payload.orderId, 
                order: action.payload.order
            }
            case types.STATUS: 
            return{
                ...state, 
                status: action.payload
            }

        default:
        return state;
    }
}