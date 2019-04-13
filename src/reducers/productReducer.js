import * as types from '../actions/types';
const initialState = {
    product: null,
    productattr: [], 
    products: [], 
    loading: false, 
    search1: null,
    initial: 1, 
    limit: 20, 
    colors: [], 
    sizes: [], 
    departments: null, 
    categories:null, 
    category: 0,
    department: 0
}
export default function (state = initialState, action){
    switch(action.type){
        case types.PRODUCTS_LOADING: 
            return{
                ...state, 
                loading: true
            }
        case types.GET_PRODUCTS:
        return{
            ...state, 
            products: action.payload, 
            loading: false
        }
        case types.SET_SAVE_PRODUCT: 
        return{
            ...state, 
            savedproduct: action.payload
        }
        case types.SET_PRODUCT_FROM_SAVED: 
        return{
            ...state, 
            product: state.savedproduct,
            savedproduct: null
        }
        case types.SET_PRODUCT:
        return{
            ...state, 
            product: action.payload, 
        
        }
        case types.GET_PRODUCT_ATTR:
        return{
            ...state, 
            productattr: action.payload, 
        }
        case types.SET_INITIAL:
        return{
            ...state, 
            initial: action.payload, 
            
        }
        case types.SET_CATEGORY:
        return{
            ...state, 
            category: action.payload, 
        }
        case types.SET_DEPARTMENT:
        return{
            ...state, 
            department: action.payload, 
            
        }
        case types.GET_COLORS: 
        return{
            ...state, 
            colors: action.payload, 
            loading: false
        }
        case types.GET_SIZES: 
        return{
            ...state, 
            sizes: action.payload, 
            loading: false
        }
        case types.GET_DEPARTMENTS: 
        return{
            ...state, 
            departments: action.payload, 
            loading: false
        }
        case types.GET_CATEGORIES: 
        return{
            ...state, 
            categories: action.payload, 
            loading: false
        }
        case types.SET_SEARCH:
        return{
            ...state, 
            search1: action.payload
        }
    
        default: 
            return state;
    }
}