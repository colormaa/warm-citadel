import * as  types  from '../actions/types';
import isEmpty from '../utils/is-empty';
const initialState = {
    isAuthenticated: false, 
    user: {}, 
    loginshow: false, 
    path: null, 
    token: null, 
    customer:{}, 
    facebookToken: null
}
export default function(state = initialState, action){
    switch(action.type){
        case types.SET_CURRENT_USER: 
            return {
                ...state, 
                isAuthenticated: !isEmpty(action.payload), 
                user: action.payload
            }
        case types.SHOW_LOGIN: 
        return{
            ...state, 
            loginshow: true
        }
        case types.HIDE_LOGIN:
        {
            return{
                ...state, 
                loginshow: false
            }
        }
        case types.SET_TOKEN: 
        return{
            ...state, 
            token: action.payload.token, 
            customer: action.payload.customer
        }
        case types.SET_PATH: 
        return{
            ...state, 
            path: action.payload
        }
        case types.FACEBOOK_TOKEN: 
        return{
            ...state, 
            facebookToken: action.payload
        }


        default:
        return state;
    }
}