import React from "react";
import { API_BASE_URL } from "../config/variables";
import jwt_decode from "jwt-decode";

export default class RegisterView extends React.Component {
  state = {
    email: "",
    password: "",
    name:"",

    isValidEmail: true,
    isValidPassword: true,
    isValidName: true
  };
  constructor(props) {
    super(props);
  }
  _toggleName = (e) =>{
    let newState = this.state;
    newState.name = e.target.value;
    this.setState(newState);
  }
  _togglePassword = (e) => {
    let newState = this.state;
    newState.password = e.target.value;
    this.setState(newState);
  };
  _toggleEmail = (e) => {
    let newState = this.state;
    newState.email = e.target.value;
    this.setState(newState);
  };
  _toggleSubmit = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let newState = this.state;
    newState.isValidEmail = re.test(String(newState.email));
    this.props.updateErrMsg("");

    if (newState.email.length < 1) {
      newState.isValidEmail = false;
    }
    if(newState.name.length < 1){
      newState.isValidName = false;
    }else{
      newState.isValidName = true;
    }
    if(!newState.password.length > 7 || newState.password.length<1) {
      newState.isValidPassword = false;
    }else {
      newState.isValidPassword = true;
    }
    this.setState(newState);

    if (this.state.isValidEmail && this.state.isValidPassword && this.state.isValidName) {
      this._fetchLogin();
    }
  };
  //Need to look at tutorial how to unload JWT.
  _fetchLogin = async () => {
    await fetch(API_BASE_URL + "/customer/register", {
      method: "POST",
      body:JSON.stringify({
        name:this.state.name,
        email:this.state.email,
        password:this.state.password
      }),
      headers: {'Content-Type':'application/json'},
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if(responseData.errorMsg){
          this.props.updateErrMsg(responseData.errorMsg);
        }else{
          var jwt = responseData.jwt;
          var user = jwt_decode(jwt);

          localStorage.setItem("jwt",jwt);
          this.props.updateUser(user);
        }
      });
  };
  render() {
    return (
      <div className="col-lg-12 card p-card" style={{ minHeight: "30em" }}>
        <div className="row">
          <div className="col-lg-12 text-center">
            <h1>Register:</h1>
          </div>
          <div className="col-lg-6 offset-lg-3">
            <label htmlFor="name">Name</label>
            <input
              type="string"
              onChange={this._toggleName.bind(this)}
              className={
                "form-control " + (!this.state.isValidName ? "is-invalid" : "")
              }
              value={this.state.name}
              id="name"
              placeholder="Name"
            />
            <div
              className={
                "invalid-feedback " +
                (!this.state.isValidName ? "invalid-feedback-show" : "")
              }
            >
              This field is required.
            </div>
          </div>
          <div className="col-lg-6 offset-lg-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={this._toggleEmail.bind(this)}
              className={
                "form-control " + (!this.state.isValidEmail ? "is-invalid" : "")
              }
              value={this.state.email}
              id="email"
              placeholder="you@example.com"
            />
            <div
              className={
                "invalid-feedback " +
                (!this.state.isValidEmail ? "invalid-feedback-show" : "")
              }
            >
              Please enter a valid email address.
            </div>
          </div>
          <div className="col-lg-6 offset-lg-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={this._togglePassword.bind(this)}
              className={
                "form-control " + (!this.state.isValidEmail ? "is-invalid" : "")
              }
              value={this.state.password}
              id="password"
              placeholder="password"
            />
            <div
              className={
                "invalid-feedback " +
                (!this.state.isValidPassword ? "invalid-feedback-show" : "")
              }
            >
              Please enter a valid password minium length needs to be 8
              characters.
            </div>
          </div>
            <div className="col-lg-3 offset-lg-3">
              <button
                onClick={this.props.toggleBack}
                className="btn btn-primary btn-lg"
              >
                Back
              </button>
            </div>
            <div className="col-lg-3">
              <button
                className="btn btn-primary btn-lg float-right"
                onClick={this._toggleSubmit}
              >
                Register
              </button>
            </div>
        </div>
      </div>
    );
  }
}
