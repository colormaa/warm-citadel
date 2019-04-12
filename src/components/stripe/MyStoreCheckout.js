import React, { Component } from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements';
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
    componentWillReceiveProps(nextProps){
    if((nextProps.order.error !== this.props.order.error) && nextProps.order.error){
        this.setState({errormessage: nextProps.order.error.message});
    }
    if((!nextProps.order.orderId) || !nextProps.order.order){
        this.props.history.push("/");
    }
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
                const order = this.props.order;
                this.setState({errormessage: null});
                let tax_price = null;
                let tax_temp = this.props.order.tax.find(el=>(parseInt(el.tax_id) === parseInt(order.tax_id)));
                if(tax_temp){
                    tax_price = Number(tax_temp.tax_percentage).toFixed(2);
                
                }
                let ship = null;
                let ship_temp = this.props.order.shipping.find(el=>(parseInt(el.shipping_id) === parseInt(order.shipping_id)));
                if(ship_temp){
                    ship = ship_temp.shipping_cost;
                }

                let total = 0;
                let total1 = 0;
                total += parseFloat(this.props.cart.total);
                total1 = (tax_price ?Number(parseFloat(tax_price*parseFloat(this.props.cart.total)/100)).toFixed(2) : 0.0);
                total += (ship ? parseFloat(ship): 0.0);
                total = parseFloat(total)+parseFloat(total1);
                total = Math.round(parseFloat(total) * 100);
               console.log("total" , total);
                 const charge = {
                    stripeToken: res.token.id, 
                    order_id: this.props.order.orderId, 
                    description: "Order", 
                    amount: total, 
                    currency: "usd"

                };
                console.log("Charge object ", charge)
                
              //this.props.history.push('/');
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