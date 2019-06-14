import * as types from './types';
import axios from 'axios';
/*
export const setSearch =(sproduct)=>dispatch=>{
    dispatch({
        type: types.SET_SEARCH, 
        payload: sproduct
    });
}*/
export const getCategoriesOfDepartment =(depid)=>dispatch=>{
//    https://backendapi.turing.com/categories/inDepartment/1
//console.log("GEt categories of department");

        dispatch(setDepartment(depid));
        axios.get(`https://backendapi.turing.com/categories/inDepartment/${depid}`)
        .then(res=>{
            dispatch({
                type: types.GET_CATEGORIES,
                payload: res.data
            });
        })
        .catch(err=>{
            dispatch({
                type: types.GET_CATEGORIES,
                payload: {}
            });
        })
}

export const setProductImage=(images)=>dispatch=>{
    dispatch({
        type: types.SET_PRODUCT_IMAGE, 
        payload: images
    })
}


export const getProducts =(search, departmentid, categoryid, page, limit)=>dispatch=>{
    //console.log("get products =================", search, departmentid, categoryid, page, limit);
    dispatch(setProductsLoading);
        dispatch(setSearch(search));
        dispatch(setInitial(page));
        dispatch(setDepartment(departmentid));
        dispatch(setCategory(categoryid));
    if(search){
        
        axios.get(`https://backendapi.turing.com/products/search?query_string=${search}&page=${page}&limit=${limit}`)
        .then(res=>{
            dispatch({
                type: types.GET_PRODUCTS,
                payload: res.data
            });
        })
        .catch(err=>{
            dispatch({
                type: types.GET_PRODUCTS,
                payload: {}
            });
        })
    }else if(categoryid>0){
        //console.log("Category =================");
        axios.get(`https://backendapi.turing.com/products/inCategory/${categoryid}?page=${page}&limit=${limit}`)
        
        .then(res=>{
            //console.log("categoryid", res);
            dispatch({
                type: types.GET_PRODUCTS,
                payload: res.data
            });
        })
        .catch(err=>{
            dispatch({
                type: types.GET_PRODUCTS,
                payload: {}
            });
        })
    }else if(departmentid>0){
        axios.get(`https://backendapi.turing.com/products/inDepartment/${departmentid}?page=${page}&limit=${limit}`)
        .then(res=>{
            //console.log("res department ", res);
            dispatch({
                type: types.GET_PRODUCTS,
                payload: res.data
            });
        })
        .catch(err=>{
            //console.log("err department", err);
            dispatch({
                type: types.GET_PRODUCTS,
                payload: []
            })
        })
    }else {
        //console.log("Else");
        //https://backendapi.turing.com/products?page=1&limit=20
       
        axios.get(`https://backendapi.turing.com/products?page=${page}&limit=${limit}`)
        .then(res=>{
            //console.log("res else ==============", res);
            dispatch({
                type: types.GET_PRODUCTS,
                payload: res.data
            });
        })
        .catch(err=>{
            //console.log("err", err);
            //console.log("error else ==============", err);
            dispatch({
                type: types.GET_PRODUCTS,
                payload: []
            })
        })
    }
    
}
export const getDepartments = ()=>dispatch=>{
    dispatch(setProductsLoading);
    axios.get('https://backendapi.turing.com/departments')
    .then(res=>{
        dispatch({
            type: types.GET_DEPARTMENTS,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type: types.GET_DEPARTMENTS,
            payload: null
        });
    })
}
export const getCategories = ()=>dispatch=>{
    dispatch(setProductsLoading);
    axios.get('https://backendapi.turing.com/categories')
    .then(res=>{
        dispatch({
            type: types.GET_CATEGORIES,
            payload: res.data.rows
        });
    })
    .catch(err=>{
        //console.log("err ", err);
        dispatch({
            type: types.GET_CATEGORIES,
            payload: null
        });
    })
}

export const setProductsLoading =()=>{
    return{
        type: types.PRODUCTS_LOADING, 
    }
}
export const setInitial =(count)=>{
    return{
        type: types.SET_INITIAL,
        payload: count 
    }
}
export const setSearch =(search)=>{
    console.log("Set Search ", search );
    return{
        type: types.SET_SEARCH,
        payload: search 
    }
}
export const setProductNull =()=>dispatch=>{
    dispatch({type: types.SET_PRODUCT, 
    payload: null
    })
}
export const setDepartment =(department)=>{
    return{
        type: types.SET_DEPARTMENT,
        payload: department 
    }
}
export const setCategory =(search)=>{
    return{
        type: types.SET_CATEGORY,
        payload: search 
    }
}
export const getColors =()=>dispatch=>{
    //console.log("get colors");
    dispatch(setProductsLoading);
    axios.get('https://backendapi.turing.com/attributes/values/2')
    .then(res=>{
        dispatch({
            type: types.GET_COLORS, 
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({
            type: types.GET_COLORS, 
            payload: {}
        })
    });
}
export const setProduct=(id)=>dispatch=>{

    axios.get(`https://backendapi.turing.com/products/${id}`)
    .then(res=>{
        dispatch({
            type: types.SET_PRODUCT, 
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({
            type: types.SET_PRODUCT, 
            payload: {}
        })
    })
    
}
/*
export const getProductAttr =(id)=>dispatch=>{
    axios.get(`https://backendapi.turing.com/attributes/inProduct/${id}`)
    .then(res=>{
        dispatch({
            type: types.GET_PRODUCT_ATTR, 
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type: types.GET_PRODUCT_ATTR, 
            payload: {}
        })
    })
}*/
export const getSizes =()=>dispatch=>{
    //console.log("get colors");
    dispatch(setProductsLoading);
    axios.get('https://backendapi.turing.com/attributes/values/1')
    .then(res=>{
        dispatch({
            type: types.GET_SIZES, 
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({
            type: types.GET_SIZES, 
            payload: {}
        })
    });
}
export const getProductAttr=(id)=>dispatch=>{
    console.log("get PRoduct attr   ==== ", id);
    axios.get(`https://backendapi.turing.com/attributes/inProduct/${id}`)
    .then(res=>{
        //console.log("GETProductAttr");
        dispatch({
            type: types.GET_PRODUCT_ATTR, 
            payload: res.data
        })
    })
    .catch(err=>{
        console.log("get PRoduct attr get error ", id  , err)
        dispatch({
            type: types.GET_PRODUCT_ATTR, 
            payload: {}
        
        })
    })
}