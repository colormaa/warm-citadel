import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {showLogin} from '../actions/authActions';
class Unauthorized  extends React.Component{
  onClickHome =()=>{
    this.props.history.push('/');
  }
  onClickLogin =()=>{
    this.props.history.push('/');
    this.props.showLogin();
  }
  render(){
    console.log("unAuthorized");
  return (
    <div className = "unauthorized" style ={{color: 'white'}}>
        <div className="unauthorized__container">
          <h3>UNAUTHORIZED</h3>
          <div>
          <button className = "homebtn" onClick = {this.onClickHome}>Back To Home Page</button>
          <button className = "loginbtn" onClick = {this.onClickLogin}>Click here to login</button>
          </div>
          
        </div>
    </div>
  )
  }
}
export default connect(null, {showLogin})(withRouter(Unauthorized));