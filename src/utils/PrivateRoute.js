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
        //console.log("provate route ", props);
    
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
/**
 * 
 * git remote add origin https://github.com/Crustalmaa/react-challemge.git
git push -u origin master 

https://medium.freecodecamp.org/how-to-set-up-simple-image-upload-with-node-and-aws-s3-84e609248792

https://dev.to/smithmanny/deploy-your-react-app-to-heroku-2b6f
https://www.youtube.com/watch?v=-edmQKcOW8s
*/
/*
add words to flash card 
https://jisho.org/api/v1/search/words?keyword=jisho    api for serach word



*/