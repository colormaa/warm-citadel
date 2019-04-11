import React, { Component } from 'react'
import {CardElement,  PaymentRequestButtonElement, injectStripe} from 'react-stripe-elements';
import TextInput from '../../common/TextInput';
import {createCharge} from '../../actions/orderActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
class MyStoreCheckout extends Component {
    state = {
        paymentRequest: '', 
        name: '', 
        errormessage: null, 
        errorname: null
       
    }
    onChange = (e)=>{
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit=(e)=>{
        e.preventDefault();
        if(this.state.name === ''){
            const errorname = "Please insert name on the card";
            this.setState({errorname: errorname});
        }else{
            this.setState({errorname: null});
        
        this.props.stripe.createToken({name: this.state.name})
        .then(res =>{
            //console.log("res  after create token", res);
            if(res.error){
                const errorcard = res.error.message;
                this.setState({errormessage: errorcard});
            }else{
                this.setState({errormessage: null});
                
                const charge = {
                    stripeToken: res.token.id, 
                    order_id: this.props.order.orderId, 
                    description: "Order", 
                    amount: Math.round(this.props.cart.total), 
                    currency: "usd"

                };
                console.log("Charge object ", charge)
                
               this.props.history.push('/');
                this.props.createCharge(charge);
            }
        })
        .catch(err=>{
            //console.log("err", err);
        })
    }
    }
  render() {
    return (
    <form onSubmit = {this.onSubmit} className = "payment__form" >
          <TextInput name = "name" placeholder = "Name on the card" type = "text" onChange = {this.onChange} value = {this.state.name} />
          <p className="error__message">{this.state.errorname}</p>

          <CardElement />
          <p className="error__message">{this.state.errormessage}</p>
        <button className = "button red-pink"> Complete Payment</button>
    </form>
     
    )
  }
}
const mapStateToProps = state =>({
    order: state.order, 
    cart: state.cart
})
export default connect(mapStateToProps, {createCharge})(injectStripe(withRouter(MyStoreCheckout))); 