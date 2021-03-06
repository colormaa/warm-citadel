import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
//import england from '../img/england.jpg';
import TextInput from '../common/TextInput';
import {connect} from 'react-redux';
import Modal from './Modal';
import Auth from './Auth';
//import FacebookAuth from 'react-facebook-auth';
//import facebookbutton from '../common/facebookbutton';
import {getTotalAmount } from '../actions/cartActions';
import Button from '../common/Button';
import {loginUser, registerUser, logoutUser, facebookLogin} from '../actions/authActions';

class TopBar extends Component {
    state ={
        isAuthenticated: true, 
        loginClicked : false,
        registerClicked: false, 
        register: {
            name: '', 
            password: '', 
            email: '', 
        }, 
        login: {
            email: '', 
            password: ''
        },
        error: {}
    }
    componentWillMount(){
        this.props.getTotalAmount(this.props.cart.cartId);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            this.setState({error: nextProps.error});
        }
        if(nextProps.auth){
            const login = {
                email: '', 
                password: ''
            };
            const register = {
                email: '', 
                name: '', 
                password: ''
            }
            if(nextProps.auth.isAuthenticated){
                this.setState({login: login, register: register, errors: {}});
                this.setState({loginClicked: false, registerClicked: false})
            }
            if(nextProps.auth.loginshow){
                this.setState({loginClicked: true});
            }
        }
        if(nextProps.cart.items !== this.props.cart.items){
          this.props.getTotalAmount(this.props.cart.cartId);
        }
    }
    onClick =()=>{
        this.setState({registerClicked: true});
    }
    loginClicked =()=>{
        this.setState({registerClicked: false, loginClicked: true, error: {}});
        ////////console.log("LOgin", this.state);
    }
    registerClicked =()=>{
        this.setState({registerClicked: true, loginClicked: false, error: {}});

    }
    closeModal =()=>{
        this.setState({registerClicked: false, loginClicked: false});
    }
    logoutUser=()=>{
        this.props.logoutUser();
        this.props.history.push('/');
    }
    
    onChangeRegister =(e)=>{
        const register = {
            ...this.state.register, 
            [e.target.name]: e.target.value
        }
        this.setState({register: register})
    }
    onChangeLogin =(e)=>{
        const register = {
            ...this.state.login, 
            [e.target.name]: e.target.value
        }
        this.setState({login: register})
    }
    onRegisterClick = ()=>{
        ////////console.log("register modal clicked");
        const regcus = {
            name: this.state.register.name, 
            email: this.state.register.email, 
            password: this.state.register.password
        }
        this.props.registerUser(regcus);
        
    }
     authenticate = (response) => {
        ////////console.log(response);
        let fbauth = {};
        fbauth.accessToken = response.accessToken;
        fbauth.email = response.email;
        fbauth.expires = response.data_access_expiration_time;
        fbauth.name = response.name;
        if(fbauth.accessToken!== null){
            this.props.facebookLogin(fbauth);
        }
        // Api call to server so we can validate the token
      };
    onLoginClick =()=>{
        // console.log("login modal clicked");
        const regcus = {
            email: this.state.login.email, 
            password: this.state.login.password
        }
        this.props.loginUser(regcus);
    }
    orderClick =()=>{
        this.props.history.push('/orderhome');
    }
    profileClick =()=>{
        this.props.history.push('/profile');
    }
  render() {
      const errorlogin = this.state.error;
          return (
      <div className = "topbar">
    {this.state.registerClicked ? (
        <Modal closeModal = {this.closeModal}>
            <Auth title = "Register"
            emessage = {errorlogin.message}
            text= "* All fields are required." closeModal = {this.closeModal} footer = {
              <div>
                  <Button text = "Create Account" onClick = {this.onRegisterClick} type = "button" color ="red-pink"/>
                        <p className = "already">Already  have an account?
                            <button onClick = {this.loginClicked} 
                            className = "nav-link"><span> </span> Login</button></p>
              </div>   

            }
            
            
           >
           
                        <TextInput placeholder = "* Email" type = "text" 
                            error = {errorlogin.field? (errorlogin.field.includes("email") ? true: false)
                            : false}
                            name = "email" onChange = {this.onChangeRegister}
                            value = {this.state.register.email}/>

                        <TextInput placeholder = "* Name" type = "text" 
                        name = "name" onChange = {this.onChangeRegister}
                        error = {errorlogin.field? (errorlogin.field.includes("name") ? true: false)
                            : false}
                        value = {this.state.register.name}/>

                        <TextInput placeholder = "* Password" type = "password" 
                        name = "password" onChange = {this.onChangeRegister}
                        error = {errorlogin.field? (errorlogin.field.includes("password") ? true: false)
                            : false}
                        value = {this.state.register.password}/>
            </Auth>
        </Modal>

            
        ): null}
        {this.state.loginClicked ? (
            <Modal  closeModal = {this.closeModal}>
            <Auth title = "Login" emessage = {errorlogin.message} text= "* All fields are required." 
           
            footer = {
                <div>
                        <Button text = "Login" onClick = {this.onLoginClick} type = "button" color ="red-pink"/>
                        <p className = "already">Don't have an account?
                            <button onClick = {this.registerClicked} 
                            className = "nav-link"><span> </span> Register</button></p>
                </div>
                
            }
                   
                    >
                    <TextInput placeholder = "* Email" type = "text" 
                    error = {errorlogin.field? (errorlogin.field.includes("email") ? true: false)
                    : false}
            name = "email" onChange = {this.onChangeLogin}
            value = {this.state.login.email}/>

                    <TextInput placeholder = "* Password" type = "password" 
                    error = {errorlogin.field? (errorlogin.field.includes("password") ? true: false)
                    : false}
            name = "password" onChange = {this.onChangeLogin}
            value = {this.state.login.password}/>
            </Auth>
            </Modal>
        ): null}
        <h3 className = "topbar__auth"><p>Hi!</p>
         
        {this.props.auth.isAuthenticated ? 
        <div className="mydropdown">
            <button className="mydropbtn">{this.props.auth.user.name}</button>
            <div className="mydropdown-content">
            <button className="mydropdown-item" onClick = {this.orderClick}>My Orders</button>
                <button className="mydropdown-item" onClick = {this.profileClick}>My Profile</button>
                <button type="button" className="mydropdown-item" onClick = {this.logoutUser}>Log Out</button> 
            </div>
        </div>
       
           
            :
            <div>
                <button type="button" className="nav-link red-pink" onClick = {this.loginClicked}>Sign in</button>
                 or
                <button type="button" className="nav-link red-pink" onClick = {this.onClick}>Register</button> 
            </div>
          }
        
        </h3>
        <h3 className = "topbar__helper">
            <Link to ="/" className = "nav-link black">Home</Link>
           
                    </h3>
        
        <div className="topbar__shop">
        <i className="fas fa-shopping-bag"></i>
                
            
            <Link to = "/" className = "nav-link black">Your bag: ${parseFloat(this.props.cart.total).toFixed(2)}</Link>
        </div>
        
      </div>
    )
  }
}
const mapStateToProps = state => ({
    error: state.error, 
    auth: state.auth, 
    cart: state.cart
})
export default connect(mapStateToProps, {loginUser, getTotalAmount,facebookLogin, registerUser, logoutUser})(withRouter(TopBar));