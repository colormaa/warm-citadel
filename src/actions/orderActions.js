import * as types from './types';
import axios from 'axios';
//import setAuthToken from '../utils/setAuthToken';
//import jwt_decode from 'jwt-decode';

export const getCountries =()=>dispatch=>{
////console.log("registerUser", regcus)
    //console.log("get cournteries");
    let country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    dispatch({
        type: types.GET_COUNTRIES, 
        payload: country_list
    })
}

export const getShippingRegion =()=>dispatch=>{
    axios.get('https://backendapi.turing.com/shipping/regions')
    .then(res=>{
        dispatch({
            type: types.GET_SHIPPING_REGION, 
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({
            type: types.GET_SHIPPING_REGION, 
            payload: []
        })
    })
}
export const getTax =()=>dispatch=>{
    axios.get('https://backendapi.turing.com/tax')
    .then(res=>{
        dispatch({
            type: types.GET_TAX, 
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({
            type: types.GET_TAX, 
            payload: []
        })
    })
}
export const createCharge =(charge)=>dispatch=>{
    console.log("============ within create charge");
    axios.post('https://backendapi.turing.com/stripe/charge', charge)
    .then(res=>{
        console.log("res  charge ====", res);
        dispatch({
            type: types.CART_LOGOUT,
        });
        axios.post('https://backendapi.turing.com/stripe/webhooks',{})
        .then(res=>{
            console.log("res  charge webhook ====", res);
            dispatch({
                type: types.ORDER_LOGOUT,
            });
        })
        .catch(err=>{
            console.log("res  charge webhook ====", err);
        });
    })
    .catch(err=>{
        console.log("err  charge ", err.response);
        dispatch({type: types.CHARGE_ERROR, 
        payload: err.response.data.error});
    });
}


export const createOrder =(order, header)=>dispatch=>{
    axios.post('https://backendapi.turing.com/orders', order, {headers: header})
    .then(res=>{
        console.log("order create res", res);
        dispatch({
            type: types.CREATE_ORDER, 
            payload: {orderId: res.data.orderId, order: order}
        });
    })
    .catch(err=>{
        console.log("order crate error", err);
        dispatch({
            type: types.CREATE_ORDER, 
            payload: {orderId: 0, order: null}
        })
    })
}

export const getShippingById =(id)=>dispatch=>{
    axios.get(`https://backendapi.turing.com/shipping/regions/${id}`)
    .then(res=>{
        console.log("getShipping ", id, res.data);
        dispatch({
            type: types.GET_SHIPPING, 
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({
            type: types.GET_SHIPPING, 
            payload: []
        })
    })
}

export const getOrderDetail =(id)=>dispatch=>{
    console.log("GEt ORders By Customer", id);
    //, {headers: {"USER-KEY": token}}
    axios.get(`https://backendapi.turing.com/orders/${id}`)
    .then(res=>{
        dispatch({
            type: types.GET__ORDER__DETAIL, 
            payload: res.data
        })
        console.log("get order by customer", res);
    })
    .catch(err=>{
        console.log(" get order err", err)
        dispatch({
            type: types.GET__ORDER__DETAIL, 
            payload: []
        })
    })
}
export const getOrdersByCustomer =(token)=>dispatch=>{
    console.log("GEt ORders By Customer", token);
    //, {headers: {"USER-KEY": token}}
    axios.get('https://backendapi.turing.com/orders/inCustomer')
    .then(res=>{
        dispatch({
            type: types.GET_ORDERS, 
            payload: res.data
        })
        console.log("get order by customer", res);
    })
    .catch(err=>{
        console.log(" get order err", err)
        dispatch({
            type: types.GET_ORDERS, 
            payload: []
        })
    })
}
export const updateCustomerAddress =(update, header)=>dispatch=>{
    axios.put('https://backendapi.turing.com/customers/address', update, {headers: header})
    .then(res=>{
        //console.log("update customer addres", res);
        dispatch({type: types.STATUS, 
        payload:  1})
    })
    .catch(err=>{
        dispatch({type: types.STATUS, 
            payload: 0})
    })
}
export const statusZero =()=>dispatch=>{
    dispatch({
        type: types.STATUS, 
        payload: 0
    })
}
export const updateCustomerInfo =(update, header)=>dispatch=>{
    axios.put('https://backendapi.turing.com/customer', update, {headers: header})
    .then(res=>{
        //console.log("update customer info", res);
        dispatch({type: types.STATUS, 
        payload:  1})
    })
    .catch(err=>{
        dispatch({type: types.STATUS, 
            payload: 0})
    })
}
export const updateCustomerCreditCard =(update, header)=>dispatch=>{
    axios.put('https://backendapi.turing.com/customers/creditCard', update, {headers: header})
    .then(res=>{
        //console.log("update customer credit card", res);
        dispatch({type: types.STATUS, 
        payload:  1})
    })
    .catch(err=>{
        dispatch({type: types.STATUS, 
            payload: 0})
    })
}
