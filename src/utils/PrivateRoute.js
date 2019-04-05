import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes  from 'prop-types';
import {showLogin, setPath} from '../actions/authActions';

const PrivateRoute =(props)=>{
    let prtemp; 
    if(props.auth.isAuthenticated === true){
        prtemp = <Route {...props} render = {props => <props.component {...props}/>} />;
    }else{
       
        prtemp = <Redirect to = "/"/>;
        console.log("provate route ", props);
    
        props.setPath(props.path);
        props.showLogin();
    }
    return prtemp;
}

PrivateRoute.propTypes = {
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    auth: state.auth
})
export default connect(mapStateToProps, {showLogin, setPath} )(PrivateRoute);