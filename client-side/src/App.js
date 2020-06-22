import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";

import CartView from "./views/CartView";
import ProfileView from "./views/ProfileView";
import ShopView from "./views/ShopView";
import HomeView from "./views/HomeView";

class App extends React.Component {
  
  state = {
    selected:"home"
  }
  _toggleLink = (name) =>{
    let newState = this.state;
    newState.selected = name;
    this.setState(newState);
    console.log(this.state);
  }

  render() {
    const NavBar = () => {
      return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
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
              <a className="nav-link">Cart</a>
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
          {this.state.selected=='shop'?
            <ShopView/>
          :this.state.selected=='cart'?
            <CartView/>
            :this.state.selected=='home'?
            <HomeView/>
          :
            <ProfileView/>
          }
        </div>
      </>
    )
  }
}

export default App;
