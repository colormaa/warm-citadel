import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getCustomer} from '../actions/authActions';
import {getShippingRegion, updateCustomerAddress, statusZero, updateCustomerInfo, updateCustomerCreditCard} from '../actions/orderActions';
import Modal from './Modal';
import Auth from './Auth';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import classnames from 'classnames';
 class Profile extends Component {
     state = {
         showModal: 0, 
         address1: null, 
         address2: null, 
         city: null, 
         region: null, 
         postalcode: null, 
         country: null, 
         erroraddress: '',
         errorinfo: '',
         errorcreditcard: '',
         shippingregion: 0, 
         name: this.props.auth.user.name, 
         email: this.props.auth.user.email, 
        password: '', 
        day_phone: '', 
        eve_phone: '', 
        mob_phone: '', 
        credit_card: ''
     }
     componentDidMount(){
         this.props.getCustomer(this.props.auth.token);
         this.props.getShippingRegion();
     }
     componentWillReceiveProps(nextProps){
         if(nextProps.order.status ===1){
            this.props.getCustomer(this.props.auth.token);
            this.props.statusZero();
         }
         if(nextProps.auth.user !== this.props.auth.user){
             this.setState({email: nextProps.auth.user.email, name: nextProps.auth.user.name});
         }
     }
     updateInfo=()=>{
        this.setState({showModal : 1});
     }
     updateAddress =()=>{
        this.setState({showModal : 2});
     }
     validateEmail = (email) =>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
     onSubmitInfoClick = (e)=>{
         const info = {
             name: this.state.name, 
             email: this.state.email, 
             password: this.state.password, 
             day_phone: this.state.day_phone, 
             eve_phone : this.state.eve_phone, 
             mob_phone : this.state.mob_phone
         }
         let error = false;
         if(this.state.name === ''){
            error = true;
         }
         if(!this.validateEmail(this.state.email)){
             error = true;
         }
         if(error){
            this.setState({errorinfo: "Required fields"});
         }else{
            this.props.updateCustomerInfo(info, {'user-key': this.props.auth.token})
            this.closeModal();
         }

     }
     onSubmitCreditCardClick =(e)=>{
         let error = false;
         //console.log("On submit creditCard click");
         if(this.state.credit_card == ''){
             error = true;
         }
         const info = {credit_card: this.state.credit_card};
         if(error){
            this.setState({errorcreditcard: "Required fields"});
            //console.log("ERRor true");
         }else{
            this.props.updateCustomerCreditCard(info, {'user-key': this.props.auth.token})
            this.closeModal();
         }
     }
     onSubmitAddressClick =(e)=>{
        const addressinfo = {
            address_1: this.state.address1, 
            address_2: this.state.address2, 
            city: this.state.city, 
            region: this.state.region, 
            postal_code: this.state.postalcode, 
            country: this.state.country, 
            shipping_region_id: this.state.shippingregion
        }
        //console.log(addressinfo);
        if(this.state.shippingregion == 0) { this.state.shippingregion = 1;}
        let errors = {};
        errors.field = false;
        if(this.state.address1 === '' || this.state.address1 == null){
            errors.field  = true;
        }
        //console.log(errors);
        if(this.state.address2 === '' || this.state.address2 == null){
            errors.field =true;
        }
        //console.log(errors);
        if(this.state.city === '' || this.state.city == null){
            errors.field =true;
        }
        //console.log(errors);
        if(this.state.region === '' || this.state.region == null){
            errors.field  = true;
        }
        //console.log(errors);
        if(this.state.postalcode === '' || this.state.postalcode == null){
            errors.field = true;
        }
        //console.log(errors);
        if(this.state.country === '' || this.state.country== null){
            errors.field = true;
        }
        //console.log(errors, this.state.country);
        if(this.state.shippingregion === 1 ){
            errors.field = true;
        }
        //console.log(errors);
        if(this.state.address1 ==null)
        this.state.address1 = '';
        if(this.state.address2 == null)
        this.state.address2 = '';
        if(this.state.city == null)
        this.state.city = '';
        if(this.state.region == null)
        this.state.region = '';
        if(this.state.postalcode == null)
        this.state.postalcode = '';
        if(this.state.country == null)
        this.state.country = '';
        if(errors.field){
            this.setState({erroraddress: " Required fields."});
        }else{
            this.props.updateCustomerAddress(addressinfo, {'user-key': this.props.auth.token})
            this.closeModal();
        }
     }
     closeModal =()=>{
         this.setState({showModal: 0});
     }
     onChangeAddress =(e)=>{
        this.setState({[e.target.name]: e.target.value});
     }
     onChangeInfo =(e)=>{
         this.setState({[e.target.name]: e.target.value});
     }
     onChangeCreditCard =(e)=>{
        this.setState({[e.target.name]: e.target.value});
    }
     onChangeShipping =(e)=>{
        this.setState({shippingregion: e.target.value});
     }
     updateCreditCard = ()=>{
        this.setState({showModal: 3});
     }
  render() {
      let customer = this.props.auth.user;
      
        let showModal = null;
        if(this.state.showModal == 1){
            showModal = (
                <Modal closeModal = {this.closeModal}>
            <Auth title = "Update Info"
            emessage = {this.state.errorinfo}
            text= "* All fields are required." closeModal = {this.closeModal} footer = {
              <div>
                  <Button text = "Update Info" onClick = {this.onSubmitInfoClick} type = "button" color ="red-pink"/>  
              </div>  
            }>
            {/*}
                   name: this.props.auth.name, 
         email: this.props.auth.customer.email, 
        password: '', 
        day_phone: '', 
        eve_phone: '', 
        mob_phone: ''*/}
                        <TextInput placeholder = "* Name" type = "text" 
                            error = {this.state.name ===''}
                            name = "name" onChange = {this.onChangeInfo}
                            value = {this.state.name }/>

                        <TextInput placeholder = "* Email" type = "text" 
                        name = "email" onChange = {this.onChangeInfo}
                        error = {this.state.email === ''||  !this.validateEmail(this.state.email)}
                        value = {this.state.email}/>

                        <TextInput placeholder = "Password" type = "password" 
                        name = "password" onChange = {this.onChangeInfo}
                       
                        value = {this.state.password}/>

                         <TextInput placeholder = "Day Phone" type = "text" 
                        name = "day_phone" onChange = {this.onChangeInfo}
                        
                        value = {this.state.day_phone}/>

                         <TextInput placeholder = "Eve phone" type = "text" 
                        name = "eve_phone" onChange = {this.onChangeInfo}
                        
                        value = {this.state.eve_phone}/>

                        <TextInput placeholder = "* Mob phone" type = "text" 
                        name = "mob_phone" onChange = {this.onChangeInfo}
                       
                        value = {this.state.mob_phone}/>
                        
            </Auth>
        </Modal>
            );
        }else if(this.state.showModal == 2){
            showModal = (
                <Modal closeModal = {this.closeModal}>
            <Auth title = "Update Address"
            emessage = {this.state.erroraddress}
            text= "* All fields are required." closeModal = {this.closeModal} footer = {
              <div>
                  <Button text = "Update Address" onClick = {this.onSubmitAddressClick} type = "button" color ="red-pink"/>  
              </div>  
            }>
                        <TextInput placeholder = "* Address 1" type = "text" 
                            error = {this.state.address1 ===''}
                            name = "address1" onChange = {this.onChangeAddress}
                            value = {this.state.address1 }/>

                        <TextInput placeholder = "* Address 2" type = "text" 
                        name = "address2" onChange = {this.onChangeAddress}
                        error = {this.state.address2 === ''}
                        value = {this.state.address2}/>

                        <TextInput placeholder = "* City" type = "text" 
                        name = "city" onChange = {this.onChangeAddress}
                        error = {this.state.city=== ''}
                        value = {this.state.city}/>

                         <TextInput placeholder = "* Region" type = "text" 
                        name = "region" onChange = {this.onChangeAddress}
                        error = {this.state.region=== ''}
                        value = {this.state.region}/>

                         <TextInput placeholder = "* Postal code" type = "text" 
                        name = "postalcode" onChange = {this.onChangeAddress}
                        error = {this.state.postalcode === ''}
                        value = {this.state.postalcode}/>

                         <TextInput placeholder = "* Country" type = "text" 
                        name = "country" onChange = {this.onChangeAddress}
                        error = {this.state.country === ''}
                        value = {this.state.country}/>
                        <select style = {{width: '100%', padding: '10px' }}  onChange = {this.onChangeShipping}
                            className = {classnames(this.state.shippingregion == 1 ?  "border-red": null, "mb-30")}
                        >
                            {this.props.order.shippingregion.map(sr =>(
                                <option key = {sr.shipping_region_id} value={sr.shipping_region_id}>{sr.shipping_region}</option>
                            ))}
                        </select>
            </Auth>
        </Modal>
            );

            
        }else if(this.state.showModal == 3){
            showModal = (
                <Modal closeModal = {this.closeModal}>
            <Auth title = "Update Credit Card"
            emessage = {this.state.errorcreditcard}
            text= "* All fields are required." closeModal = {this.closeModal} footer = {
              <div>
                  <Button text = "Update Credit Card" onClick = {this.onSubmitCreditCardClick} type = "button" color ="red-pink"/>  
              </div>  
            }>
                        <TextInput placeholder = "* Credit Card" type = "text" 
                            error = {this.state.credit_card ===''}
                            name = "credit_card" onChange = {this.onChangeCreditCard}
                            value = {this.state.credit_card }/>

                        
            </Auth>
        </Modal>
            );
        }
        
        else{
            showModal = null;
        }

    return (
      <div className = "profile">
        {showModal}
         <h3 className="title">User Profile</h3>
         <div className="profile__buttons">
            <button className="button red-pink" onClick = {this.updateInfo}>Update Customer Info</button>
            <button className="button red-pink" onClick = {this.updateAddress}>Update Customer Address</button>
            <button className="button red-pink" onClick = {this.updateCreditCard}>Update Customer Credit Card</button>
         </div>
         <table className="profile__table">
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{customer.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{customer.email}</td>
                </tr>
                <tr>
                    <td>Credit Card</td>
                    <td>{customer.credit_card}</td>
                </tr>
                <tr>
                    <td>Address 1</td>
                    <td>{customer.address_1}</td>
                </tr>
                <tr>
                    <td>Address 2</td>
                    <td>{customer.address_2}</td>
                </tr>
                <tr>
                    <td>City</td>
                    <td>{customer.city}</td>
                </tr>
                <tr>
                    <td>Region</td>
                    <td>{customer.region}</td>
                </tr>
                <tr>
                    <td>Postal Code</td>
                    <td>{customer.postal_code}</td>
                </tr>
                <tr>
                    <td>Country</td>
                    <td>{customer.country}</td>
                </tr>
                <tr>
                    <td>Shipping region id</td>
                    <td>{customer.shipping_region_id}</td>
                </tr>
                <tr>
                    <td>Day Phone</td>
                    <td>{customer.day_phone}</td>
                </tr>
                <tr>
                    <td>Eve Phone</td>
                    <td>{customer.eve_phone}</td>
                </tr>
                <tr>
                    <td>Mobile Phone</td>
                    <td>{customElements.mob_phone}</td>
                </tr>
            </tbody>
         </table>
         
        
      </div>
    )
  }
}
const mapStateToProps =state =>({
    auth: state.auth, 
    order: state.order
});
export default connect(mapStateToProps, {getCustomer, getShippingRegion, updateCustomerCreditCard, statusZero, updateCustomerInfo, updateCustomerAddress})( Profile);