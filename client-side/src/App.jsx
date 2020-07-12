import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import {API_BASE_URL} from "./config/variables";
import ClipLoader from "react-spinners/BeatLoader";

import CartView from "./views/CartView";
import ProfileView from "./views/ProfileView";
import ShopView from "./views/ShopView";
import HomeView from "./views/HomeView";
import CheckoutView from "./views/CheckoutView";

class App extends React.Component {
  
  state = {
    selected:"profile",
    user:null,
    items:[],
    subscribedItems:[],
    isLoaded:false,
    cartNumber:0,
    isCheckout:false
  }
  _resetSubscribedItems = () =>{
    let newState = this.state;
    newState.subscribedItems = [];
    this.setState(newState);
    this._updateCartNumber();
  }
  _updateUser = (user) =>{
    let newState = this.state;
    newState.user = user;
    if(newState.isCheckout){
      newState.isCheckout = false;
      this._toggleLink('checkout');
    }
    this.setState(newState);
  }
  _toggleLink = (name) =>{
    let newState = this.state;
    newState.selected = name;
    this.setState(newState);
  }
  _fetchItems=async()=>{
    await fetch(API_BASE_URL+"/item",{
      method:"POST"
    }).then(response => { return response.json();})
    .then(responseData => {
      let newState = this.state;
      newState.items = responseData.items;
      newState.isLoaded = true;
      this.setState(newState);
    });
  }
  _updateCartNumber = () =>{
    let newState = this.state;
    var count = 0;
    for(var i=0;i<newState.subscribedItems.length;++i){
      if(!newState.subscribedItems[i].quantity){
        count++;
      }else{
        count = count + newState.subscribedItems[i].quantity;
      }
    }
    newState.cartNumber = count;
    this.setState(newState);
  }
  _addItemToCart=(item)=>{
    let newState = this.state;
    var found = false;
    for(var i=0;i<newState.subscribedItems.length && !found;++i){
      if(newState.subscribedItems[i]._id == item._id){
        found = true;
        if(newState.subscribedItems[i].quantity){
          newState.subscribedItems[i].quantity++;
        }else{
          newState.subscribedItems[i].quantity = 2;
        }
      }
    }
    if(!found){
      newState.subscribedItems.push(item);
    }
    this.setState(newState);
    this._updateCartNumber();
  }
  _deleteItemFromCart=(item)=>{
    let newState = this.state;
    var found = false;
    for(var i=0;i<newState.subscribedItems.length && !found;++i){
      if(newState.subscribedItems[i]._id == item._id){
        found = true;
        newState.subscribedItems[i].quantity = null;
        newState.subscribedItems.splice(i,1);
      }
    }
    this.setState(newState);
    this._updateCartNumber();
    console.log(this.state);
  }
  _toggleCheckout = () =>{
    let newState = this.state;
    newState.isCheckout = true;
    this._toggleLink('checkout');
    this.setState(newState);
  }
  _removeItemFromCart=(item)=>{
    let newState = this.state;
    var found = false;
    for(var i=0;i<newState.subscribedItems.length && !found;++i){
      if(newState.subscribedItems[i]._id == item._id){
        found = true;
        if(newState.subscribedItems[i].quantity>1){
          newState.subscribedItems[i].quantity--;
        }else{
          newState.subscribedItems.splice(i,1);
        }
      }
    }
    this.setState(newState);
    this._updateCartNumber();
  }
  componentDidMount = () =>{
    this._fetchItems();
  }

  render() {
    const NavBar = () => {
      return (
        <nav className="navbar navbar-expand-md bg-dark my-nav fixed-top">
        <a className={"navbar-brand"} onClick={(e)=>{this._toggleLink('shop')}}>Cash App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li onClick={(e)=>{this._toggleLink('shop')}} className={"nav-item "+ (this.state.selected == 'shop' ? 'active' : '')}>
              <a className="nav-link">Shop</a>
            </li>
            <li onClick={(e)=>{this._toggleLink('cart')}} className={"nav-item "+ (this.state.selected == 'cart' ? 'active' : '')}>
            <a className="nav-link">Cart<sup>{this.state.cartNumber}</sup></a>
            </li>
            <li onClick={(e)=>{this._toggleLink('profile')}} className={"nav-item "+ (this.state.selected == 'profile' ? 'active' : '')}>
              <a className="nav-link">Profile</a>
            </li>
          </ul>
        </div>
      </nav>
      );
    };
    return (
      <>
        {NavBar()}
        <div className="content">
        <div className="container" style={{ marginTop: "5em" }}>
          {!this.state.isLoaded && this.state.selected =='shop'?
          <div className="h-100 d-flex justify-content-center align-items-center" style={{marginTop:'20em'}}>
            <ClipLoader size={100} color="#51B8C8"/>
          </div>
          :this.state.selected=='shop'?
            <ShopView items={this.state.items} addItemToCart={this._addItemToCart}/>
          :this.state.selected=='checkout'?
            <CheckoutView updateUser={this._updateUser} nav={this._toggleLink} reset={this._resetSubscribedItems} user={this.state.user} items={this.state.subscribedItems}/>
          :this.state.selected=='cart'?
            <CartView items={this.state.subscribedItems} delete={this._deleteItemFromCart} add={this._addItemToCart} 
              remove={this._removeItemFromCart} nav={this._toggleLink} toggleCheckout={this._toggleCheckout}/>
            :this.state.selected=='home'?
            <HomeView isLoggedIn={this.state.user}/>
          :
            <ProfileView isCheckout={this.state.isCheckout} user={this.state.user} nav={this._toggleLink} updateUser={this._updateUser}/>
          }
        </div>
        </div>
      </>
    )
  }
}

export default App;
