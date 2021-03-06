import React from 'react'
import classnames from 'classnames';
//import axios from 'axios';
import {connect} from 'react-redux';
import {setProduct, getProductAttr} from '../actions/productActions'
import {showLogin} from '../actions/authActions';
import {createCart, addProduct} from '../actions/cartActions';
//import Axios from 'axios';
class ProductDetail extends React.Component {
    state = {
        quantity: 1, 
        size: 0, 
        color: null, 
        errors: {}
    }
    componentDidMount(){
            //this.props.setProduct(this.props.product.product.product_id);
            if(!this.props.cart.cartId){
            this.props.createCart();
            }
    }
    oncheck =(val)=>{
        //console.log("ON check", val);
        this.setState({color: val});
      }
    sizeSelected =(e)=>{
        //console.log(e.target.value);
        
        let vv = "aa";
        vv = this.props.product.productattr.find(el =>
            //console.log("el ",e.target.value,el.attribute_value_id,el.attribute_value_id == e.target.value)
           parseInt(el.attribute_value_id) === parseInt(e.target.value)
            
        )
        if(e.target.value === "0")
        {
            this.setState({size: 0});
        }else{
            this.setState({size: vv});
        }
        console.log("seize selected ",e.target.value);
    }
    addToCart =()=>{
        console.log(this.state.quantity);
        console.log(this.state.size);
        console.log(this.state.color);
        let errors = {};
        if(this.state.quantity<1){
            errors.quantity = "Quantity must be greater than 1.";
        }
        let attrtestsize = this.props.product.productattr.map(attr=>(
            attr.attribute_name=== "Size"
        )).includes(true);
        if(this.state.size===0 && attrtestsize){
            errors.size = "Please select the size of the product";
        }
        let attrtestcolor = this.props.product.productattr.map(attr=>(
            attr.attribute_name=== "Color"
        )).includes(true);
        if(this.state.color=== null && attrtestcolor){
            errors.color = "Please select the color of the product";
        }
        if(!errors.color&& ! errors.size && !errors.quantity){
            //console.log("OK added to cart");
            this.setState({errors: errors});
            if(!this.props.auth.isAuthenticated){
                //console.log("not authenticaed");
               // this.props.setSaveProduct(this.props.product.product);
                
                this.props.closeModal();
                this.props.showLogin();
                
            }else{
                console.log("Autenticaed", this.props.cart.products);
                /*
                if(!this.props.cart.cartId){
                    this.props.createCart();
                }*/
                if(this.props.cart.cartId){
                    for(var i = 0; i<this.state.quantity; i++){
                        this.props.addProduct({
                            product_id: this.props.product.product.product_id, 
                            cart_id: this.props.cart.cartId, 
                            attributes: this.state.size.attribute_value+','+this.state.color.attribute_value
                        });
                    }
                }
            
                this.props.closeModal();
            }
            //console.log(this.state);
            
        }else{
            //console.log("show the errors", errors);
            //console.log(this.state);
            this.setState({errors: errors});
        } 
    }
    quantityClicked =(num)=>{
        //console.log("Quantity clicked");
        if(this.state.quantity === 1 && num=== -1){
            return;
        } 
        let v = this.state.quantity +num;
        this.setState({quantity: v});
    }
    render(){
    //console.log("product detail", this.props);
    let proattr = this.props.product.productattr;

    let color=[];
    let size = [];
    if(this.props.product.productattr.length > 0){
            proattr.map(pr=>{
            if(pr.attribute_name === "Color"){
                color.push(pr);
            }else if(pr.attribute_name === "Size"){
                size.push(pr);
            }
            return null; 
            })
            
    }
    let colorOptions = (color? 
      color.map(col=>(
            <li key = {col.attribute_value_id}>
              <input type="radio"  className = "color__form__radio" id = {col.attribute_value_id} name="color" value={col.attribute_value} 
              onChange = {()=>this.oncheck(col)}/>
              <div className = "color__form__radio__item"></div>
               <label htmlFor={col.attribute_value_id} className={classnames("color__form__radio__label", "radio__color__"+col.attribute_value)}>
              </label>
            </li>
      )): 
    null);
        //console.log(size);
    let sizeOptions = (size? 
      size.map(siz=>(
          <option key = {siz.attribute_value_id} value={siz.attribute_value_id}>{siz.attribute_value}</option>
      )): 
    null);
    let product = this.props.product.product;
  return (
    <div className = "productdetail">
        <div className = "productdetail__first">
            
            <img src={this.props.product.productImage ? this.props.product.productImage[parseInt(product.product_id-1)].image: "./img/empty.jpg"} className = "productdetail__img productdetail__img__big" alt=""/>
        </div>
        <div className = "productdetail__second">
            <h3 className="productdetail__title">{product.name}</h3>

            <h3 className="productdetail__price">${parseInt(product.discounted_price) === 0  ? product.price: product.discounted_price}</h3>
            <p className="productdetail__description">{product.description}</p>
            <div className="productdetail__color">
                <h4 className="productdetail__subtitle">
                    Color
                </h4>
               
                
            {colorOptions ? <ul className="color__form__group"> {colorOptions} </ul> : null }
            {this.state.errors.color?  <p className = "error__message">Select the color</p>: <p className = "error__message">&nbsp;</p> }
            </div>
            <div className="productdetail__size">
                <h4 className="productdetail__subtitle">
                    Sizes
                </h4>
                {sizeOptions ? <select onChange = {this.sizeSelected} >
                <option value="0">Please select size</option>
                {sizeOptions}</select> : null }
                {this.state.errors.size?  <p className = "error__message">Select the size</p>: <p className = "error__message">&nbsp;</p> }
            
            </div>
            <div className="productdetail__quantity">
                <h4 className="productdetail__subtitle">
                    Quantity
                </h4>
                <div className = "productdetail__quantity__button">
                    <button onClick = {()=> this.quantityClicked(-1)}>-</button>
                <p>{this.state.quantity}</p>
                <button onClick = {()=>this.quantityClicked(1)}>+</button>
                </div>
                
            </div>
            <button className = "button red-pink" onClick = {this.addToCart}>Add to cart</button>
        </div>
    </div>
  )
    }
}
const mapStateToProps =(state)=>({
    product: state.product, 
    auth: state.auth, 
    cart: state.cart
})
export default connect(mapStateToProps, {setProduct, getProductAttr, showLogin, createCart, addProduct})(ProductDetail);