import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getOrdersByCustomer} from '../actions/orderActions';
import Moment  from  'react-moment';
class OrderHome extends Component {
    componentDidMount(){
        this.props.getOrdersByCustomer(this.props.auth.token);
    }
  render() {
    let orders = this.props.order.orders;
    let ordertab = null;
    let orderrow = null;
    if(orders){

      orderrow = orders.map(ors =>{
        return(
          <tr key = {ors.order_id}>
              <td><Moment format="YYYY MMM D hh:mm:ss" withTitle>
                {ors.created_date}
            </Moment></td>
              <td>{ors.total_amount}</td>
              <td>{ors.shipped_on} </td>
              <td>{ors.status}</td>
          </tr>
        )
      });
      
      ordertab = (
        <table>
          <tbody>
            <tr>
              <td>Created Date</td>
              <td>Total Amount</td>
              <td>Shipped On</td>
              <td>Status</td>
            </tr>
            {orderrow}
          </tbody>
        </table>
      );
    }
    return (
      <div className = "orderhome">
        <h3 className="orderhome__title">Order Home</h3>
        
        {ordertab}
      </div>
    )
  }
}
const mapStateToProps = state =>({
  order: state.order, 
  auth: state.auth
});
export default connect(mapStateToProps, {getOrdersByCustomer})(OrderHome);