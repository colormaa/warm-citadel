import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { emptyCart, addQuantityProduct, removeProduct} from '../actions/cartActions';
class Cart extends Component {
  decreaseQuantity =(pro)=>{
    if(pro.quantity === 1)
    {
      return;
    }
    const product = pro.product;
    let totalPrice = parseFloat(this.props.cart.total) - parseFloat(product.discounted_price == 0 ? product.price : product.discounted_price);
 
    pro.quantity = pro.quantity-1;
    //console.log("decrease quantity ", totalPrice);
    this.props.addQuantityProduct(pro, totalPrice);
  }
  increaseQuantity =(pro)=>{
    const product = pro.product;
    let totalPrice = parseFloat(this.props.cart.total) + parseFloat(product.discounted_price == 0 ? product.price : product.discounted_price);
 
 
    pro.quantity = pro.quantity+1;
    //console.log("increase quantity ", totalPrice);
    this.props.addQuantityProduct(pro, totalPrice);
    
  }
  removeItem =(pro)=>{
    //console.log("Pro remove item ", pro);
    const product = pro.product;
    let totalPrice = parseFloat(this.props.cart.total) - parseFloat(parseFloat(product.discounted_price == 0 ? product.price : product.discounted_price)*pro.quantity);
    
    this.props.removeProduct(pro, totalPrice);
  }
  emptyCart =()=>{
    this.props.emptyCart();
  }
  placeOrder =()=>{
    this.props.history.push('/order');
  }
  render() {
    let productlist;
    let productcontainer;
    const products = this.props.cart.products;
    //console.log("PRoduct list", products.length);
    let totalPrice=0;
    if(products.length >=1 ){
       
       totalPrice = products.map(pro=> (pro.quantity * (pro.product.discounted_price == 0 ? pro.product.price : pro.product.discounted_price))).reduce((acc, cur)=> acc + cur); 
      productlist = products.map(pro =>(
        <tr key = {pro.product.product_id+'.'+pro.color.attribute_value_id+"."+pro.size.attribute_value_id}> 
            <td>
              <div onClick = {()=>this.removeItem(pro)} className="cart__table__icon">
                &times;
              </div>
              remove
            </td>
            <td style = {{justifyContent: 'flex-start'}}>
              <p>{pro.product.name}</p>
            </td>
            <td style = {{justifyContent: 'flex-start'}}>
              <p>{pro.color.attribute_name} : {pro.color.attribute_value} , {pro.size.attribute_name} : {pro.size.attribute_value}</p>
            </td>
            <td>
              <p>{pro.product.discounted_price == 0 ? pro.product.price : pro.product.discounted_price}</p>
            </td>
            <td>
              <div className = "quantity__pink">
                <div className = "quantity__pink__button" onClick = {()=>this.decreaseQuantity(pro)}>-</div>
                <p>{pro.quantity}</p>
                <div className = "quantity__pink__button" onClick = {()=>this.increaseQuantity(pro)} >+</div>
              </div>
              
            </td>
            <td><p>
              {Number(pro.quantity * (pro.product.discounted_price == 0 ? pro.product.price : pro.product.discounted_price)).toFixed(2)}
              </p></td>
          </tr>
      ))

      productcontainer = (
        <div className = "cart">
        <div className="cart__header">
          <button className="button red-pink" onClick = {this.emptyCart}>Empty cart</button>
          <p className = "cart__price">Total {parseFloat(totalPrice).toFixed(2)}</p>
          <button className="button red-pink" onClick = {this.placeOrder}> place order</button>
        </div>
        <table className="cart__table">
        <tbody>
          <tr>
            <th></th>
            <th>
              <h4 className="cart__table__header">Name</h4>
            </th>
            <th>
              <h4 className="cart__table__header">Attributes</h4>
            </th>
            <th>
              <h4 className="cart__table__header">Price</h4>
            </th>
            <th>
              <h4 className="cart__table__header">Quantity</h4>
            </th>
            <th>
              <h4 className="cart__table__header">Sub Total</h4>
            </th>
          </tr>
          {productlist}
        </tbody>
        </table>
        
        
      </div>
       );
    }else{
      productcontainer = <p className="message">No items in the cart.</p>
    }
    return productcontainer;
  }
}
const mapStateToProps = state=>({
  cart: state.cart
})
export default connect(mapStateToProps, {addQuantityProduct, emptyCart, removeProduct})(withRouter(Cart));