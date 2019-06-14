import React from 'react'
import {connect} from 'react-redux';
import Categories from './Categories';
import {getProducts , setProductImage, setInitial, setSearch} from '../actions/productActions';
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
        console.log("component did no found", this.props.product.search1
        )
        let list = [
            {id: 1, image: "https://i.ibb.co/92Gk0CW/1.jpg"},
            {id: 1, image: "https://i.ibb.co/rmMzbD0/2.jpg"},
            {id: 1, image: "https://i.ibb.co/dJqDWL3/3.jpg"},
            {id: 1, image: "https://i.ibb.co/2jPCHnB/4.jpg"},
            {id: 1, image: "https://i.ibb.co/G26mgC6/5.jpg"},
            {id: 1, image: "https://i.ibb.co/0DJn54H/6.jpg"},
            {id: 1, image: "https://i.ibb.co/72dGBR5/7.jpg"},
            {id: 1, image: "https://i.ibb.co/k1665x3/8.jpg"},
            {id: 1, image: "https://i.ibb.co/Wt3Jgx6/9.jpg"},
            {id: 1, image: "https://i.ibb.co/bX7fwTp/10.jpg"},
            {id: 1, image: "https://i.ibb.co/vDSMXrs/11.jpg"},
            {id: 1, image: "https://i.ibb.co/qpzbvQ8/12.jpg"},
            {id: 1, image: "https://i.ibb.co/XXF4tv6/13.jpg"},
            {id: 1, image: "https://i.ibb.co/5GJWLBB/14.jpg"},
            {id: 1, image: "https://i.ibb.co/6mSRP5K/15.jpg"},
            {id: 1, image: "https://i.ibb.co/3y8FDLp/16.jpg"},
            {id: 1, image: "https://i.ibb.co/WKv7ktR/17.jpg"},
            {id: 1, image: "https://i.ibb.co/GtNh6FG/18.jpg"},
            {id: 1, image: "https://i.ibb.co/kSDFqks/19.jpg"},
            {id: 1, image: "https://i.ibb.co/TTRtGGP/20.jpg"},
            {id: 1, image: "https://i.ibb.co/bLdDmbb/21.jpg"},
            {id: 1, image: "https://i.ibb.co/KbWbVGT/22.jpg"},
            {id: 1, image: "https://i.ibb.co/n3zdnkV/23.jpg"},
            {id: 1, image: "https://i.ibb.co/Jz12CXb/24.jpg"},
            {id: 1, image: "https://i.ibb.co/xz16tRk/25.jpg"},
            {id: 1, image: "https://i.ibb.co/ZVzvkyP/26.jpg"},
            {id: 1, image: "https://i.ibb.co/bKwCSgx/27.jpg"},
            {id: 1, image: "https://i.ibb.co/YQPPyj8/28.jpg"},
            {id: 1, image: "https://i.ibb.co/fpbvM9P/29.jpg"},
            {id: 1, image: "https://i.ibb.co/3rFwrS7/30.jpg"},
            {id: 1, image: "https://i.ibb.co/F0rJJXG/31.jpg"},
            {id: 1, image: "https://i.ibb.co/8B7s1sL/32.jpg"},
            {id: 1, image: "https://i.ibb.co/0QRpXsx/33.jpg"},
            {id: 1, image: "https://i.ibb.co/XtKDHbL/34.jpg"},
            {id: 1, image: "https://i.ibb.co/FzhkRxR/35.jpg"},
            {id: 1, image: "https://i.ibb.co/0jqDBVb/36.jpg"},
            {id: 1, image: "https://i.ibb.co/mDFHmqY/37.jpg"},
            {id: 1, image: "https://i.ibb.co/CMtVb2N/38.jpg"},
            {id: 1, image: "https://i.ibb.co/t8ZZZ1Q/39.jpg"},
            {id: 1, image: "https://i.ibb.co/44BBtjY/40.jpg"},
            {id: 1, image: "https://i.ibb.co/2ZmPcm0/41.jpg"},
            {id: 1, image: "https://i.ibb.co/s2H6K7p/42.jpg"},
            {id: 1, image: "https://i.ibb.co/GWx7HcG/43.jpg"},
            {id: 1, image: "https://i.ibb.co/ZByNfMn/44.jpg"},
            {id: 1, image: "https://i.ibb.co/Q8QVdKP/45.jpg"},
            {id: 1, image: "https://i.ibb.co/cCFWpJh/46.jpg"},
            {id: 1, image: "https://i.ibb.co/txj7bts/47.jpg"},
            {id: 1, image: "https://i.ibb.co/hFtnp8z/48.jpg"},
            {id: 1, image: "https://i.ibb.co/MhhP3q0/49.jpg"},
            {id: 1, image: "https://i.ibb.co/HYP6hnM/50.jpg"},
            {id: 1, image: "https://i.ibb.co/9NjByv7/51.jpg"},
            {id: 1, image: "https://i.ibb.co/yhLVKw2/52.jpg"},
            {id: 1, image: "https://i.ibb.co/XZTTNH4/53.jpg"},
            {id: 1, image: "https://i.ibb.co/C63qBYM/54.jpg"},
            {id: 1, image: "https://i.ibb.co/xJLb4pM/55.jpg"},
            {id: 1, image: "https://i.ibb.co/YprnJf6/56.jpg"},
            {id: 1, image: "https://i.ibb.co/9cyBTjX/57.jpg"},
            {id: 1, image: "https://i.ibb.co/S5y63gc/58.jpg"},
            {id: 1, image: "https://i.ibb.co/Y7xWqTY/59.jpg"},
            {id: 1, image: "https://i.ibb.co/NFRTkQc/60.jpg"},
            {id: 1, image: "https://i.ibb.co/Mf190Ht/61.jpg"},
            {id: 1, image: "https://i.ibb.co/Wvr54pX/62.jpg"},
            {id: 1, image: "https://i.ibb.co/dgHbDNs/63.jpg"},
            {id: 1, image: "https://i.ibb.co/sqjqpc9/64.jpg"},
            {id: 1, image: "https://i.ibb.co/prCLD6b/65.jpg"},
            {id: 1, image: "https://i.ibb.co/bBGHSvQ/66.jpg"},
            {id: 1, image: "https://i.ibb.co/8MdZv8w/67.jpg"},
            {id: 1, image: "https://i.ibb.co/bv60ZXx/68.jpg"},
            {id: 1, image: "https://i.ibb.co/qJJLbDG/69.jpg"},
            {id: 1, image: "https://i.ibb.co/j42cVgh/70.jpg"},
            {id: 1, image: "https://i.ibb.co/Qjnn9p0/71.jpg"},
            {id: 1, image: "https://i.ibb.co/9qhKQ7Y/72.jpg"},
            {id: 1, image: "https://i.ibb.co/XW8v6LZ/73.jpg"},
            {id: 1, image: "https://i.ibb.co/ss68CZZ/74.jpg"},
            {id: 1, image: "https://i.ibb.co/CzwWxpk/75.jpg"},
            {id: 1, image: "https://i.ibb.co/X74NNB6/76.jpg"},
            {id: 1, image: "https://i.ibb.co/4ZX4JrX/77.jpg"},
            {id: 1, image: "https://i.ibb.co/0mb2r1S/78.jpg"},
            {id: 1, image: "https://i.ibb.co/G7CgVSX/79.jpg"},
            {id: 1, image: "https://i.ibb.co/fXrdY82/80.jpg"},
            {id: 1, image: "https://i.ibb.co/9pjR0DM/81.jpg"},
            {id: 1, image: "https://i.ibb.co/9s4Zms6/82.jpg"},
            {id: 1, image: "https://i.ibb.co/3h3VxSX/83.jpg"},
            {id: 1, image: "https://i.ibb.co/wrFnJMc/84.jpg"},
            {id: 1, image: "https://i.ibb.co/T8bzxN1/85.jpg"},
            {id: 1, image: "https://i.ibb.co/kXddGf1/86.jpg"},
            {id: 1, image: "https://i.ibb.co/943CGfj/87.jpg"},
            {id: 1, image: "https://i.ibb.co/fX2tvmg/88.jpg"},
            {id: 1, image: "https://i.ibb.co/q16xpxW/89.jpg"},
            {id: 1, image: "https://i.ibb.co/0h5DhGk/90.jpg"},
            {id: 1, image: "https://i.ibb.co/QjHDCnW/91.jpg"},
            {id: 1, image: "https://i.ibb.co/6rFBT6G/92.jpg"}, 
            {id: 1, image: "https://i.ibb.co/f1VB0FP/93.jpg"}, 
            {id: 1, image: "https://i.ibb.co/H454B5k/94.jpg"}, 
            {id: 1, image: "https://i.ibb.co/60wFHhB/95.jpg"}, 
            {id: 1, image: "https://i.ibb.co/s3SXn8L/96.jpg"}, 
            {id: 1, image: "https://i.ibb.co/GkgwdQq/97.jpg"}, 
            {id: 1, image: "https://i.ibb.co/TKKgtJ3/98.jpg"}, 
            {id: 1, image: "https://i.ibb.co/kgzqV87/99.jpg"}, 
            {id: 1, image: "https://i.ibb.co/SdmRxsX/100.jpg"}, 
            {id: 1, image: "https://i.ibb.co/BqNYn4Q/101.jpg"}, 
            {id: 1, image: "https://i.ibb.co/w4PwRtQ/102.jpg"}, 
            {id: 1, image: "https://i.ibb.co/PgrDWKJ/103.jpg"}, 
            {id: 1, image: "https://i.ibb.co/BL5nf2x/104.jpg"}, 
            {id: 1, image: "https://i.ibb.co/YhSRtsz/105.jpg"}, 
            {id: 1, image: "https://i.ibb.co/72g1wNv/106.jpg"}, 
            ];
            let list2 = list.map((li, id) =>{
                const lis = {id: (id+1), image: li.image};
                return lis;
            })
            this.props.setProductImage(list2);
            console.log("list ", list);
            console.log("list 2", list2);
        this.props.getProducts(this.props.product.search1, this.props.product.department, this.props.product.category, this.state.initial, this.state.limit);
       
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
export default connect(mapStateToProps, {getProducts, setSearch,setProductImage, setInitial})(MainPart);