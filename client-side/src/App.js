import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

class App extends React.Component {
  

  render() {
    const NavBar = () => {
      return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <a className="navbar-brand" href="#">Cash App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/shop">Shop</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cart">Cart</a>
            </li>
            <li className="nav-item pull-right">
              <a className="nav-link" href="/profile">Profile</a>
            </li>
          </ul>
        </div>
      </nav>
      );
    };
    return (
      <>
        {NavBar()}
        <h1>Test</h1>
      </>
    )
  }
}

export default App;
