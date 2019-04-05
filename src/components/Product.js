import React from 'react'
import {connect} from 'react-redux';
import classnames from 'classnames';
import {getProductAttr, setProduct} from '../actions/productActions';
import Modal from './Modal';
class Product extends React.Component{
  state = {
    size: 0, 
    color: 0, 
    selected: false
  }
  onMouseEntered =(e, id)=>{
    
  }
  
  onSelectSize =(size)=>{
    console.log("on SElect size");
    console.log(size.target.value);
  }
  onClickProduct =(id)=>{
    this.props.getProductAttr(id);
    console.log("On click product");
    this.setState({selected: true});
    console.log("this. ", this.state);
    this.props.setProduct(this.props.row.product_id);
  }
  closeModal=()=>{
    console.log("eee close Modal");
//    this.setState({selected: !this.state.selected});
    this.setState((prevState) => ({color: 100 }));
    console.log("this. ", this.state);
  }

  render(){
    
  
    return (
      <div className = "product" onMouseEnter={(e)=>this.onMouseEntered(e, this.props.row.product_id)} onClick = {()=>this.onClickProduct()}  >
        
          {this.props.row.discounted_price > 0?  <div className="product__hot">SALE</div>: null}
          
          <div className="product__image">
              <img src={`https://backendapi.turing.com/images/products/${this.props.row.thumbnail}`} alt=""/>
          </div>
          <h3 className="product__title">
              {this.props.row.name}
          </h3>
          <h3 className="product__price">
              {this.props.row.discounted_price > 0?  this.props.row.discounted_price: this.props.row.price}
          </h3>
          <div className="product__hover">
              <button className = "button red-pink">Add to cart</button>
           
          </div>
      </div>
    )}
}
const  mapStateToProps =state=>({
  product: state.product
});
export default connect(mapStateToProps, {getProductAttr, setProduct})(Product);