import React, { Component } from 'react'
import {StripeProvider, Elements} from 'react-stripe-elements';
import MyStoreCheckout from './stripe/MyStoreCheckout';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
class Payment extends Component {
    componentWillMount(){
        if(this.props.order.orderId ==0 || this.props.order.status == 0) {
            this.props.history.push("/");
        }
    }
  render() {
    return (
      <div className = "payment">
      
            <h3 className = "payment__title">Proceed payment</h3>
            <StripeProvider  apiKey = "pk_test_NcwpaplBCuTL6I0THD44heRe">
                <Elements>
                <MyStoreCheckout />
                </Elements>
            </StripeProvider>
            
      </div>
    )
  }
}
const mapStateToProps = state =>({
    cart: state.cart, 
    order: state.order
});
export default  connect(mapStateToProps)(withRouter(Payment));