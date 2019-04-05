import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getOrdersBycustomer} from '../actions/orderActions';
class OrderHome extends Component {
    componentDidMount(){
        this.props.getOrdersBycustomer();
    }
  render() {
    return (
      <div>
        Order Home
      </div>
    )
  }
}
export default connect(null, {getOrdersBycustomer})(OrderHome);