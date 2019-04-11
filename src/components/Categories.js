import {connect} from 'react-redux';
//import classnames from 'classnames';
import React, { Component } from 'react'
import {getColors, getSizes, getDepartments, getCategories, getProducts, getCategoriesOfDepartment} from '../actions/productActions';
class Categories extends Component {
  state = {
    department: 0, 
    category: 0
  }
    componentDidMount(){
      this.props.getColors();
      this.props.getSizes();
      this.props.getDepartments();
      this.props.getCategories();
    }
    departmentOnClick=(depid)=>{
      this.setState({department: depid});
      //console.log(this.state.department);
      this.props.getCategoriesOfDepartment(depid);
      this.props.getProducts(null, depid, 0, 1, this.props.product.limit);
      
    }
    categoryOnClick=(depid)=>{
      this.setState({category:  depid});
      ////console.log(this.state.department);
      //console.log("depid category", this.props.product.department, depid);
      this.props.getProducts(null, this.props.product.department, depid, 1, this.props.product.limit);
    }
  render() {
    const {departments} = this.props.product;
    let categories = [];
    if(!this.props.product.loading){
      categories = this.props.product.categories;
    }
    //console.log("this.props.product", this.props.product);
   // //console.log(this.props.product, categories);
    let coloritems, sizeitems, departmentitems, categoryitems ;
   // //console.log("colors ", colors, sizes);
    
   // //console.log("departments ", departments);
    if(departments){
        departmentitems = departments.map(dep=>(
          <button  key = {dep.department_id} onClick = {()=>this.departmentOnClick(dep.department_id)}>
             {dep.name}
          </button>
        ))
    }
   // //console.log("categories ", categories);
    if(categories){
   //   //console.log("Catroeis if ", categories.rows);
      categories = categories;
      categoryitems = categories.map(cat =>(
        <button key = {cat.category_id} onClick = {()=>this.categoryOnClick(cat.category_id)} > {cat.name}   </button>
      ))
      
    }
    return (
      <div className = "category">
        
        <div action="" className = "category__form">
          <h4 className = "category__form__title">Departments</h4>
          <div className="department__box">
            {departmentitems}
          </div>
              
          
          <h4 className = "category__form__title">Categories</h4>
          <div className="category__box">
            {categoryitems}
          </div>
            
          
          {/*
          <h4 className = "category__form__title">Color</h4>
          <ul className="color__form__group">
            {coloritems}
          </ul>
          <h4 className = "category__form__title">Sizes</h4>
          <ul className="size__form__group">
            {sizeitems}
          </ul>
          */}
          
        </div>
      </div>
    )
  }
}
const maptStateToProps =state=>({
   product: state.product 
});
export default connect(maptStateToProps , {getColors, getSizes, getDepartments, getCategoriesOfDepartment, getCategories, getProducts})(Categories);
