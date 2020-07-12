import React from "react";
import { API_BASE_URL } from "../config/variables";
import jwt_decode from "jwt-decode";
import FadeIn from 'react-fade-in';

export default class LoginView extends React.Component {
  state = {
    email: "",
    password: "",

    isValidEmail: true,
    isValidPassword: true,
  };
  constructor(props) {
    super(props);
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
    if (!newState.password.length > 7 || newState.password.length<1) {
      newState.isValidPassword = false;
    } else {
      newState.isValidPassword = true;
    }
    this.setState(newState);

    if (this.state.isValidEmail && this.state.isValidPassword) {
      this._fetchLogin();
    }
  };
  //Need to look at tutorial how to unload JWT.
  _fetchLogin = async () => {
    await fetch(API_BASE_URL + "/customer/login", {
      method: "POST",
      body:JSON.stringify({
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
      <FadeIn>
      <div className="col-lg-12 card p-card" style={{ minHeight: "30em" }}>
        <div className="row">
          <div className="col-lg-12 text-center">
            <h1>Login:</h1>
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
                Login
              </button>
            </div>
        </div>
      </div>
      </FadeIn>
    );
  }
}
