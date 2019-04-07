import React from 'react'
import {connect} from 'react-redux';
import Categories from './Categories';
import {getProducts , setInitial, setSearch} from '../actions/productActions';
import Products from './Products';
import classnames from 'classnames';
class MainPart extends React.Component{
    state ={
        limit: 10, 
        initial: 1, 
        
    }
    componentWillReceiveProps(nextProp){
        if(nextProp.product){
            this.setState({
                limit: nextProp.product.limit, 
                initial: nextProp.product.initial
            });
        }
    }
    componentDidMount(){
        this.props.getProducts(this.props.product.search, this.props.product.department, this.props.product.category, this.state.initial, this.state.limit);
       
    }
    paginationClick =(e)=>{
        this.setState({initial: e.target.value});
        this.props.setInitial(e.target.value);
      //  //console.log("pagination ",e.target.value )
        this.props.getProducts(this.props.product.search, this.props.product.department, this.props.product.category, e.target.value, this.state.limit);
        
    }
    prevClick =()=>{
       const v = this.state.initial -1;
      //  //console.log("v", this.state.initial);
        //    this.props.getProducts(v, this.state.limit);
        this.props.getProducts(this.props.product.search, this.props.product.department, this.props.product.category, v, this.state.limit);
       
        this.setState({initial: v});
       // this.props.setInitial(this.state.initial);
        
    }
    nextClick =()=>{
        const v = this.state.initial + 1;
        //console.log("next",v);
        this.setState({initial: v});
            //console.log("next search null", this.state.initial);
            this.props.getProducts(this.props.product.search, this.props.product.department, this.props.product.category, v, this.state.limit);
    }
    render(){
      //  //console.log("MainPart product");
      //  //console.log(this.props.product.initial);
        const count = this.props.product.products.count;
        let products; 
        if(this.props.product.loading){
            products = <h2>Loading..</h2>;
        }else{
            products = <Products 
            products = {this.props.product.products}
          />
        }
        let pagination =[];
        for (var i = 1; i < Math.ceil(count/this.state.limit)+1; i++)
        {
            //console.log("pagination ",Math.ceil(count/this.state.limit)+1 )
            pagination.push(<li className="mypagination__page-item"  key = {i} >
                <button  value = {i} onClick = {(e)=>this.paginationClick(e)} className={classnames("mypagination__page-link", i=== this.props.product.initial ? 'mypagination__page-link__active' : null )}
                >{i}</button></li>);
        }
        //console.log("pagination ================", pagination);
        return (
            <div className = "mainpart">
            {/* Pagination 1, 3, 4  */}
                {pagination.length === 0 ? null : 
                    <ul className="mypagination">
                            <li className={classnames("mypagination__p", this.props.product.initial <=1 ? "mypagination__disabled": null)} onClick = {this.prevClick}>
                            <div className = "mypagination__pn">&lt;</div>
                            <button className=" mypagination__pre" aria-label="Back">
                                Back
                            </button>
                            </li>
                                {pagination}
                            <li className={classnames("mypagination__n", this.props.product.products.count<=(this.props.product.limit*this.props.product.initial) ? "mypagination__disabled": null)} disabled onClick = {this.nextClick}>
                            <button className="mypagination__next" aria-label="Forward">
                                Forward 
                            </button>
                            <div className = "mypagination__pn">&gt;</div>
                            </li>
                        </ul>
                }
                <div className = "mainpart__main">
                <Categories />
                {products}

                </div>
              
            </div>
          )
    }

}
const mapStateToProps =state=>({
    product: state.product
})
export default connect(mapStateToProps, {getProducts, setSearch, setInitial})(MainPart);