import React, { Component } from 'react'
import TextInput from '../common/TextInput';
import {getCountries, getShippingRegion, getShippingById, createOrder, getTax, updateCustomerAddress} from '../actions/orderActions';
import {createCart} from '../actions/cartActions';
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
        errors: {}, 
        shipping: 0
        
    }
    componentDidMount(){
        this.props.getCountries();
        this.props.getShippingRegion();
        this.props.getTax();
        if(this.props.cart.items.length === 0){
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
            //console.log("on select change", e.target.name, e.target.value);
            this.setState({[e.target.name]: e.target.value});
    }
    onSelectChange =(e)=>{
       
        
            this.setState({[e.target.name]: e.target.value});
            if(e.target.name === "shippingregion"){
                this.props.getShippingById(e.target.value);
            }
        
        console.log("this . state ", this.state);
            //console.log("on select change", e.target.name, e.target.value);
    }
    onSubmit=(e)=>{
        e.preventDefault();
      //console.log("On Submit order");
      
        if(this.props.cart.items.length === 0){
            
            
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
            if(!this.state.shipping){
                errors.shipping = "Please enter shipping";
            }
            this.setState({errors: errors});
            if(!(errors.address1|| errors.address2 || errors.city || errors.region || errors.postalcode || errors.country || errors.tax || errors.shippingregion)){
                //console.log("Order No error" )
               
                
                
                    this.props.createOrder({
                        cart_id: this.props.cart.cartId, 
                        customer_id: this.props.auth.customer.customer_id, 
                        shipping_id: this.state.shipping, 
                        tax_id: parseInt(this.state.tax), 
                        
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
      let shipping;
      if(this.props.order.shipping.length !== 0){
          shipping = this.props.order.shipping.map(count=>(
               <option key = {count.shipping_id} value = {count.shipping_id}>{count.shipping_type}</option>
          ))
      }
      let tax_price = null;
      let tax_temp = this.props.order.tax.find(el=>(el.tax_id == this.state.tax));
      if(tax_temp){
        tax_price = Number(tax_temp.tax_percentage).toFixed(2);
      
      }
      let ship = null;
      let ship_temp = this.props.order.shipping.find(el=>(el.shipping_id == this.state.shipping));
      if(ship_temp){
          ship = ship_temp.shipping_cost;
      }

      let total = 0;
      let total1 = 0;
      total += parseFloat(this.props.cart.total);
      total1 = (tax_price ?Number(parseFloat(tax_price*parseFloat(this.props.cart.total)/100)).toFixed(2) : 0.0);
      total += (ship ? parseFloat(ship): 0.0);
      total = parseFloat(total)+parseFloat(total1);

      console.log("tax price ", tax_price, tax_temp);
      console.log("ship price ", ship, ship_temp, this.state.shipping);
      console.log("total ", total, total1 );
      console.log("this.state ", this.state);
    return (
      <div className = "order">
            <h3 className="title">Shipping address</h3>
            <form onSubmit = {(e)=>this.onSubmit(e)} className = "order__form">
                <TextInput value = {this.state.address1} name = "address1" placeholder = "Address 1" error = {this.state.errors.address1} onChange = {(e)=> this.onChange(e)} />
                <p className="message__text">{this.state.errors.address1}&nbsp;</p>
                <TextInput value = {this.state.address2} name = "address2" placeholder = "Address 2" error = {this.state.errors.address2} onChange = {(e)=> this.onChange(e)} />
                <p className="message__text">{this.state.errors.address2}&nbsp;</p>
                <div className = "order__full">
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
                <div className = "order__full">
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
                <div className="order__shipping">
                    <label htmlFor="">Shipping</label>
                    <select name = "shipping" onChange = {(e)=> this.onSelectChange(e)} > 
                       <option value= "0" >Please select shipping</option>
                        {shipping}
                    </select>
                    <p className = "error__message">{this.state.errors.shipping} &nbsp;</p>
                </div>
                <div className="order__price">
                    <h3>Total Amount</h3>
                    <p>Cart total price: <span>${this.props.cart.total}</span></p>
                    <p>Tax: <span>${tax_price ? Number(tax_price*this.props.cart.total/100).toFixed(2) : 0.0}</span></p>
                    <p>Shipping: <span>${ship ? ship : 0.0} </span></p>
                    <p>Total Amount: <span>${Number(total).toFixed(2)}</span></p>
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
export default connect(mapStateToProps, {getCountries, getShippingById, createCart, getShippingRegion, updateCustomerAddress, createOrder, getTax})(withRouter(Order));