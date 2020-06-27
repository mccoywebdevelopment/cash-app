import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import {API_BASE_URL} from "./config/variables";
import PulseLoader from "react-spinners/PulseLoader";

import CartView from "./views/CartView";
import ProfileView from "./views/ProfileView";
import ShopView from "./views/ShopView";
import HomeView from "./views/HomeView";

class App extends React.Component {
  
  state = {
    selected:"home",
    user:null,
    items:[],
    subscribedItems:[],
    isLoaded:false
  }
  _toggleLink = (name) =>{
    let newState = this.state;
    newState.selected = name;
    this.setState(newState);
    console.log(this.state);
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
  _addItemToCart=(item)=>{
    let newState = this.state;
    newState.subscribedItems.push(item);
    this.setState(newState);
  }
  componentDidMount = () =>{
    this._fetchItems();
  }

  render() {
    const NavBar = () => {
      return (
        <nav className="navbar navbar-expand-md bg-dark my-nav fixed-top">
        <a className={"navbar-brand"} onClick={(e)=>{this._toggleLink('home')}}>Cash App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li onClick={(e)=>{this._toggleLink('shop')}} className={"nav-item "+ (this.state.selected == 'shop' ? 'active' : '')}>
              <a className="nav-link">Shop</a>
            </li>
            <li onClick={(e)=>{this._toggleLink('cart')}} className={"nav-item "+ (this.state.selected == 'cart' ? 'active' : '')}>
            <a className="nav-link">Cart<sup>{this.state.subscribedItems.length}</sup></a>
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
          <div className="h-100 d-flex justify-content-center align-items-center" style={{marginTop:'10em'}}>
            <PulseLoader size={100} color="#51B8C8"/>
          </div>
          :this.state.selected=='shop'?
            <ShopView items={this.state.items} addItemToCart={this._addItemToCart}/>
          :this.state.selected=='cart'?
            <CartView items={this.state.subscribedItems}/>
            :this.state.selected=='home'?
            <HomeView isLoggedIn={this.state.user}/>
          :
            <ProfileView user={this.state.user}/>
          }
        </div>
        </div>
      </>
    )
  }
}

export default App;
