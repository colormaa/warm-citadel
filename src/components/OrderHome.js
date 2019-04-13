import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getOrdersByCustomer, getOrderDetail} from '../actions/orderActions';
//import Moment  from  'react-moment';
import Modal from './Modal';
class OrderHome extends Component {
  state = {
    showModal: false
  }
    componentDidMount(){
        this.props.getOrdersByCustomer(this.props.auth.token);
    }
    orderClicked =(id)=>{
      this.setState({showModal: true});
      console.log("Order clicked");
      this.props.getOrderDetail(id);
    }
    closeModal =()=>{
      console.log("close Modal ");
      this.setState({showModal: false});
    }
  render() {
    console.log("This is setstate", this.state);
    let orders = this.props.order.orders;
    let ordertab = null;
    let orderrow = null;
    if(orders){

      orderrow = orders.map(ors =>{
        if(parseInt(ors.status) === 2){
        return(
          <tr key = {ors.order_id} onClick = {()=>this.orderClicked(ors.order_id)}>
              <td>
                {
                  ors.created_on.split('T')[0]+" "
                  
                  }
                  {
                    ors.created_on.split('T')[1].split('.')[0]
                  }
              </td>
              <td>{ors.total_amount}</td>
              <td>{ors.shipped_on} </td>
              <td>{(parseInt(ors.status) === 2 ? "Paid" : "Invalid")}</td>
              <td><button className="button red-pink" onClick = {()=>this.orderClicked(ors.order_id)}>
                  View Detail
                </button>
              </td>
          </tr>
        )
        }else{
          return null;
        }
      });
      
      ordertab = (
        
        <table>
          <tbody>
            <tr>
              <td>Created Date</td>
              <td>Total Amount</td>
              <td>Shipped On</td>
              <td>Status</td>
              <td></td>
            </tr>
            {orderrow}
          </tbody>
        </table>
        
      );
    }
    let orderdetail = null;
    let orderdet = null;
    
    if(this.props.order.orderdetails.length >0){
      if(this.state.showModal){
          orderdetail = this.props.order.orderdetails.map(od=>{
            return(
              <tr key = {od.product_id +od.attributes}>
                <td>{od.product_name}</td>
                <td>{od.attributes}</td>
                <td>{od.quantity}</td>
                <td>{od.unit_cost}</td>
                <td>{od.subtotal}</td>
              </tr>
            );
          })
          orderdet = (
            <Modal closeModal = {()=>this.closeModal()}>
              <div className = "orderdetail__modal">
              <h3>Order Detail</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>Product name</td>
                      <td>Attributes</td>
                      <td>Quantity</td>
                      <td>Unit Cost</td>
                      <td>Subtotal</td>
                  </tr>
                    {orderdetail}
                  </tbody>
                </table>
              </div>
              
            </Modal>
          );
      }
      else{
        orderdet = null;
      }
    }
    
    return (
      <div className = "orderhome">
      {orderdet}
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
export default connect(mapStateToProps, {getOrdersByCustomer, getOrderDetail})(OrderHome);