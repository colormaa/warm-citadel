import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { emptyCart,setStatusZero, getTotalAmount,getCartProducts, removeItem, updateItem} from '../actions/cartActions';
class Cart extends Component {
  componentDidMount(){
    this.props.getTotalAmount(this.props.cart.cartId);
console.log("this.props.cart", this.props.cart.cartId);
    if(this.props.cart.items.length === 0){
	if(this.props.cart.cartId){
      this.props.getCartProducts(this.props.cart.cartId);
	}
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.cart.status ===1){
      this.props.getCartProducts(this.props.cart.cartId);
      this.props.setStatusZero();
    }
    if(nextProps.cart.items !== this.props.cart.items){
      this.props.getTotalAmount(this.props.cart.cartId);
    }
  }
  decreaseQuantity =(pro)=>{
    if(pro.quantity === 1)
    {
      return;
    }
    pro.quantity = pro.quantity-1;
    this.props.updateItem(pro);
  }
  increaseQuantity =(pro)=>{
    pro.quantity = pro.quantity+1;
    this.props.updateItem(pro);
  }
  removeItem =(pro)=>{
    //console.log("Pro remove item ", pro);
   // const product = pro.product;
    //let totalPrice = parseFloat(this.props.cart.total) - parseFloat(parseFloat(product.discounted_price == 0 ? product.price : product.discounted_price)*pro.quantity);
    console.log(" pro  ", pro);
    //this.props.removeProduct(pro, totalPrice);
    this.props.removeItem(pro);
  }
  emptyCart =()=>{
    this.props.emptyCart(this.props.cart.cartId);
  }
  placeOrder =()=>{
   /* this.props.cart.products.forEach(pro =>
      {   //console.log("foreach ", pro);
          const payload  = {
              cart_id: this.props.cart.cartId, 
              product_id: pro.product.product_id,
              attributes: pro.color.attribute_value_id +','+pro.size.attribute_value_id
          };
          this.props.addProductToCart(payload, {'user-key': this.props.auth.token});
      });
      */
     
    this.props.history.push('/order');
  }
  render() {
    let productlist;
    let productcontainer;
    //const products = this.props.cart.products;
    const products = this.props.cart.items;
    //console.log("PRoduct list", products.length);
   // let totalPrice=0;
    if(products.length >=1 ){
       
       //totalPrice = products.map(pro=> (pro.quantity * (pro.product.discounted_price == 0 ? pro.product.price : pro.product.discounted_price))).reduce((acc, cur)=> acc + cur); 
        
       productlist = products.map(pro =>(
          <tr key = {pro.item_id}> 
              <td>
                <div onClick = {()=>this.removeItem(pro.item_id)} className="cart__table__icon">
                  &times;
                </div>
                remove
              </td>
              <td style = {{justifyContent: 'flex-start'}}>
                <p>{pro.name}</p>
              </td>
              <td style = {{justifyContent: 'flex-start'}}>
                <p>{/*pro.color.attribute_name} : {pro.color.attribute_value} , {pro.size.attribute_name} : {pro.size.attribute_value*/}
                  {pro.attributes}
                </p>
              </td>
              <td>
                <p>{/*pro.product.discounted_price == 0 ? pro.product.price : pro.product.discounted_price*/}
                    {pro.price}
                </p>
              </td>
              <td>
                <div className = "quantity__pink">
                  <div className = "quantity__pink__button" onClick = {()=>this.decreaseQuantity(pro)}>-</div>
                  <p>{pro.quantity}</p>
                  <div className = "quantity__pink__button" onClick = {()=>this.increaseQuantity(pro)} >+</div>
                </div>
                
              </td>
              <td><p>
                {/*Number(pro.quantity * (pro.product.discounted_price == 0 ? pro.product.price : pro.product.discounted_price)).toFixed(2)*/}
                ${pro.subtotal}
                </p></td>
            </tr>
        ))

      productcontainer = (
        <div className = "cart">
        <div className="cart__header">
          <button className="button red-pink" onClick = {this.emptyCart}>Empty cart</button>
          <p className = "cart__price">Total {parseFloat(this.props.cart.total).toFixed(2)}</p>
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
  cart: state.cart, 
  auth: state.auth
})
export default connect(mapStateToProps, {setStatusZero, getTotalAmount,updateItem, removeItem, emptyCart, getCartProducts})(withRouter(Cart));