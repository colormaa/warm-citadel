import * as  types  from '../actions/types';
import isEmpty from '../utils/is-empty';
const initialState = {
    cartId: null, 
    products: [], 
    total: 0
}
export default function(state = initialState, action){
    //console.log("cart REducer", action.payload);
    switch(action.type){
         
        case types.CREATE_CART: 
        return{
            ...state, 
            cartId : action.payload
        }
        case types.ADD_PRODUCT: 
        return{
            ...state, 
            products: [...state.products, action.payload.product], 
            total: action.payload.total
        }
        case types.ADD_QUANTITY_PRODUCT: {
            var foundIndex = state.products.findIndex(x => x.product.product_id == action.payload.product.product.product_id 
                    && x.size.attribute_value_id == action.payload.product.size.attribute_value_id &&
                        x.color.attribute_value_id == action.payload.product.color.attribute_value_id);
            let temp = [];
            temp = state.products[foundIndex] = action.payload.product;
            return{
                ...state, 
                products:[ ...state.products], 
                total: action.payload.total  
            }
        }
        case types.CART_REMOVE_PRODUCT: {
            //console.log("CArt rmeove product ___________", action);
            var foundIndex = state.products.findIndex(x => x.product.product_id == action.payload.product.product.product_id 
                    && x.size.attribute_value_id == action.payload.product.size.attribute_value_id &&
                        x.color.attribute_value_id == action.payload.product.color.attribute_value_id);
            
            state.products.splice(foundIndex);
            return{
                ...state, 
                products:[ ...state.products], 
                total: action.payload.total
                
            }
        }
        case types.EMPTY_CART: 
        return{
            ...state, 
            products: [], 
            total: 0
        }
        default:
        return state;
    }
}