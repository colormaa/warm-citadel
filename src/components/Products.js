import React, { Component } from 'react'
import Product from './Product';
import {connect} from 'react-redux';
import Modal from './Modal';
import {setProductNull} from '../actions/productActions'
import ProductDetail from './ProductDetail';
class Products extends Component {
    
    state = {
      selected: false
    }
    closeModal =()=>{
      this.props.setProductNull();
    }
  render() {
    //console.log(this.props);
    const {rows} = this.props.products;
    //console.log(rows);
    let productitem;
    if(rows){
      if(rows.length>0){
        productitem = rows.map(row=>{
          return(
            <Product  key = {row.product_id} row = {row}/>
          );
        });
      }else{
        productitem = <h4 className="message">No products has been found.</h4>
      }
    }
    let modalProduct;
    if(this.props.product.product){ 
      modalProduct = (<Modal closeModal = {this.closeModal}>
        <ProductDetail closeModal = {this.closeModal} product = {this.props.product.product}  />
    </Modal>);
    }else{
            modalProduct=null
    }
    
   
    return (
      <div className = "Products">
        {modalProduct}
        {productitem}
      </div>
    )
  }
}
const mapStateToProp =state=>({
  product: state.product
})
export default connect(mapStateToProp, {setProductNull})(Products);