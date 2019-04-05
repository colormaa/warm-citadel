import * as  types  from '../actions/types';
import isEmpty from '../utils/is-empty';
const initialState = {
    countries: [], 
    shippingregion: [], 
    tax: [], 
    orderId: 0, 
    orders: [], 
    tax_id: 0, 
    status: 1
}
export default function(state = initialState, action){
    switch(action.type){
        case types.GET_COUNTRIES: 
            return {
                ...state, 
                countries: action.payload
            }
            case types.GET_SHIPPING_REGION: 
            return {
                ...state, 
                shippingregion: action.payload
            }
            case types.GET_TAX: 
            return {
                ...state, 
                tax: action.payload
            }
            case types.CREATE_ORDER: 
            return {
                ...state, 
                orderId: action.payload.order, 
                tax_id: action.payload.tax
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