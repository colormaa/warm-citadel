import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProducts, getDepartments} from '../actions/productActions';
import {getTotalAmount} from '../actions/cartActions';
//import classnames from 'classnames';
class Navbar extends Component {
    state = {
        toggle: false, 
        search: ''
    }
    toggleClicked =()=>{
        this.setState({toggle: !this.state.toggle});
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.product){
            this.setState({search: nextProps.product.search});
        }
        if(nextProps.cart.items !== this.props.cart.items){
            this.props.getTotalAmount(this.props.cart.cartId);
          }
    }
    departmentClick =(id, closetag)=>{
        if(closetag>0){
            this.toggleClicked();
        }
        this.props.getProducts(null, id, 0, 1, this.props.product.limit);
    }
    onSubmit=(e)=>{
        e.preventDefault();
        
       this.props.history.push('/');
       
        this.props.getProducts(this.state.search, 0, 0, 1, this.props.product.limit);
    }
    searchCloseClicked =(e)=>{
        
        this.setState({search: ''});
    }
    searchChanged=(e)=>{
        this.setState({[e.target.name]: e.target.value});
    }
    notificationClicked =()=>{
        //console.log("notification clicked");
        this.props.history.push('/cart');
    }
  render() {
/*      let departmentnormal;
      if(this.props.product.departments){
          departmentnormal = this.props.product.departments.map(dep =>(
            <li key = {dep.department_id}>
                <button onClick = {()=>this.departmentClick(dep.department_id, 0)} className = "nav-link navbar__nav__item">{dep.name}</button>
            </li>
          ))
      }
      
      let departmenttoggle;
      if(this.props.product.departments){
          departmenttoggle = this.props.product.departments.map(dep =>(
            <li key = {dep.department_id}>
                <button onClick = {()=>this.departmentClick(dep.department_id, 1)} className = "navbar__toggle__nav-link">{dep.name}</button>
                
            </li>
          ))
      }
      */
    return (
      <div className = "navbar">
            <h4 className="navbar__logo">SHOPMATE</h4>
            {/*}
            <ul className="navbar__nav">
                {departmentnormal}
                
               
            </ul>
            
            <div className = "navbar__toggle">
                <div className="navbar__toggle__button" onClick = {this.toggleClicked}> 
                    <p></p>
                    <p></p>
                    <p></p>
                      </div>
                <div className = {classnames( this.state.toggle ? 'navbar__toggle__toggleshow': "navbar__toggle__toggleclose")}>
                    <div className = {classnames("navbar__toggle__container")}>
                        <div className="navbar__toggle__nav">
                                <div className = "navbar__toggle__close" onClick = {this.toggleClicked}>&times;</div>
                               {departmenttoggle}
                        </div>
                    </div>
                </div>
                

            </div>
            */}
            <form onSubmit = {this.onSubmit} className="navbar__form">
                <button><i className = "mdi mdi-magnify"></i></button>
                <input type="text" name  = "search" value = {this.state.search || ''} onChange = {(e)=>this.searchChanged(e)} className = "navbar__form__input"
                 placeholder = "search anything"/>
                <div className="navbar__form__close" onClick ={this.searchCloseClicked}>
                <i className="mdi mdi-close"></i>
                </div>


            </form>
            <Link to = "/cart" className="navbar__notification" //onClick = {this.notificationClicked}
            >
            <i className="fas fa-shopping-bag"></i>
                <p>{this.props.cart.items.length}</p>
            </Link>
      </div>
    )
  }
}
const mapStateToProps = (state)=>({
    product: state.product, 
    auth: state.auth, 
    cart: state.cart
    
})
export default connect(mapStateToProps, {getProducts, getTotalAmount, getDepartments})(withRouter(Navbar));