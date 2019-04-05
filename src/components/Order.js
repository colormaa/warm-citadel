import React, { Component } from 'react'
import TextInput from '../common/TextInput';
import {getCountries, getShippingRegion, createOrder, getTax, updateCustomerAddress} from '../actions/orderActions';
import {createCart, addProductToCart} from '../actions/cartActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import isEmpty from '../utils/is-empty';
class Order extends Component {
    state = {
        address1: '', 
        address2: '', 
        city: '', 
        region: '', 
        postalcode: '', 
        country:0, 
        shippingregion: 0, 
        tax: 0, 
        errors: {}
        
    }
    componentDidMount(){
        this.props.getCountries();
        this.props.getShippingRegion();
        this.props.getTax();
        if(this.props.cart.products.length === 0){
            this.props.history.push('/')
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.order.orderId)
        {
            this.props.history.push("/payment");
        }
    }
    onChange =(e)=>{
            console.log("on select change", e.target.name, e.target.value);
            this.setState({[e.target.name]: e.target.value});
    }
    onSelectChange =(e)=>{
        this.setState({[e.target.name]: e.target.value});
            console.log("on select change", e.target.name, e.target.value);
    }
    onSubmit=(e)=>{
        e.preventDefault();
      console.log("On Submit order");
      
        if(this.props.cart.products.length === 0){
            
            
        }else{
            const errors = {};
            if(this.state.address1 === ''){
                errors.address1 = "Please enter address1";
            }
            if(this.state.address2 === ''){
                errors.address2 = "Please enter address2";
            }
            if(this.state.city === ''){
                errors.city = "Please enter city";
            }
            if(this.state.region === ''){
                errors.region = "Please enter region";
            }
            if(this.state.postalcode === ''){
                errors.postalcode = "Please enter postal code";
            }

            if(this.state.country === 0){
                errors.country = "Please enter country";
            }
            if(this.state.tax === 0){
                errors.tax = "Please enter tax";
            }
            if(this.state.shippingregion === 0){
                errors.shippingregion = "Please enter shippingregion";
            }
            this.setState({errors: errors});
            if(!(errors.address1|| errors.address2 || errors.city || errors.region || errors.postalcode || errors.country || errors.tax || errors.shippingregion)){
                console.log("Order No error" )
               
                this.props.cart.products.forEach(pro =>
                    {   console.log("foreach ", pro);
                        const payload  = {
                            cart_id: this.props.cart.cartId, 
                            product_id: pro.product.product_id, 
                            attributes: pro.color.attribute_value_id +','+pro.size.attribute_value_id
                        };
                       this.props.addProductToCart(payload, {'user-key': this.props.auth.token});
                    });
                    
                    this.props.createOrder({
                        cart_id: this.props.cart.cartId, 
                        customer_id: this.props.auth.customer.customer_id, 
                        shipping_id: parseInt(this.state.shippingregion), 
                        tax_id: parseInt(this.state.tax)
                    }, 
                    {'user-key': this.props.auth.token}
                    );
                
                    const updateaddress = {
                        address_1: this.state.address1,
                        address_2: this.state.address2, 
                        city: this.state.city, 
                        region: this.state.region, 
                        postal_code: this.state.postalcode, 
                        country: this.state.country, 
                        shipping_region_id: parseInt(this.state.shippingregion)
                    };
                        /*
                    const updateaddress = {
                        address_1: 'Address 1',
                        address_2: "address 2", 
                        city: "city", 
                        region: "region", 
                        postal_code: "postal code ", 
                        country: "country", 
                        shipping_region_id: 1
                    };    
                    */           
                            
                    this.props.updateCustomerAddress(updateaddress, {'user-key': this.props.auth.token});

            }else{
                console.log("errors ", errors);
            }
        }

    }
  render() {
      let countries;
      if(this.props.order.countries.length !== 0){
          countries = this.props.order.countries.map(count =>(
              <option key = {count} value={count}>{count}</option>
          ))
      }
      let shippingregion;
      if(this.props.order.shippingregion.length !== 0){
          shippingregion = this.props.order.shippingregion.map(count =>(
              <option key = {count.shipping_region_id} value={count.shipping_region_id}>{count.shipping_region}</option>
          ))
      }
      let tax;
      if(this.props.order.tax.length !== 0){
          tax = this.props.order.tax.map(count =>(
              <option key = {count.tax_id} value={count.tax_id}>{count.tax_type}</option>
          ))
      }
    return (
      <div className = "order">
            <h3 className="title">Shipping address</h3>
            <form onSubmit = {(e)=>this.onSubmit(e)} className = "order__form">
                <TextInput value = {this.state.address1} name = "address1" placeholder = "Address 1" error = {this.state.errors.address1} onChange = {(e)=> this.onChange(e)} />
                <p className="message__text">{this.state.errors.address1}&nbsp;</p>
                <TextInput value = {this.state.address2} name = "address2" placeholder = "Address 2" error = {this.state.errors.address2} onChange = {(e)=> this.onChange(e)} />
                <p className="message__text">{this.state.errors.address2}&nbsp;</p>
                <div>
                    <div className = "order__third">
                    <TextInput value = {this.state.city} name = "city" error = {this.state.errors.city} placeholder = "City" onChange = {(e)=> this.onChange(e)} />
                    <p className="message__text">{this.state.errors.city}&nbsp;</p>
                    </div>
                    <div className = "order__third">
                    <TextInput value = {this.state.region} name = "region" error = {this.state.errors.region} placeholder = "Region" onChange = {(e)=> this.onChange(e)} />
                    <p className="message__text">{this.state.errors.region}&nbsp;</p>
                    </div>            
                    <div className = "order__third">
                    <TextInput value = {this.state.postalcode} name = "postalcode" error = {this.state.errors.postalcode} placeholder = "Postal code" onChange = {(e)=> this.onChange(e)} />
                    <p className="message__text">{this.state.errors.postalcode}&nbsp;</p>
                    </div>
                
                </div>
                <div>
                    <div className="select__contain">
                    <label htmlFor="">Country</label>
                    <select name = "country" onChange = {(e)=> this.onSelectChange(e)} > 
                       <option value="0">Please select your country</option>
                        {countries}
                    </select>
                    <p className = "error__message">{this.state.errors.country}</p>
                    </div>
                    <div className="select__contain">
                    <label htmlFor="">Shipping Region</label>
                    <select name = "shippingregion" onChange = {(e)=> this.onSelectChange(e)} > 
                      
                        {shippingregion}
                    </select>
                    <p className = "error__message">{this.state.errors.shippingregion}</p>
                    </div>
                    <div className="select__contain">
                    <label htmlFor="">Tax</label>
                    <select name = "tax" onChange = {(e)=> this.onSelectChange(e)} > 
                       <option value= "0" >Please select tax</option>
                        {tax}
                    </select>
                    <p className = "error__message">{this.state.errors.tax}</p>
                    </div>
                </div>
                <button   className = "button red-pink">Order</button>
            </form>
      </div>
    )
  }
}
const mapStateToProps =state =>({
    order: state.order, 
    cart: state.cart, 
    auth: state.auth
})
export default connect(mapStateToProps, {getCountries, createCart, getShippingRegion, updateCustomerAddress, addProductToCart, createOrder, getTax})(withRouter(Order));