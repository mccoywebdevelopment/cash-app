import React from "react";
import { API_BASE_URL } from "../config/variables";
import secureImage from "./images/secure.svg";

import LoginView from "./LoginView";
import RegisterView from "./RegisterView";

export default class ProfileView extends React.Component {
  state = {
    isLogin: false,
    isRegister: false,

    errMsg: "",
  };
  constructor(props) {
    super(props);
  }
  _fetchLogout = async () => {
    const bearer = "Bearer " + localStorage.getItem("jwt");
    console.log(this.props.user);
    await fetch(API_BASE_URL + "/customer/logout", {
      method: "POST",
      body: JSON.stringify({
        userID: this.props.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.errorMsg) {
          this._updateErrMsg(responseData.errorMsg);
        } else {
          localStorage.setItem("jwt", null);
          this.props.updateUser(null);
        }
      });
  };
  _selectRegister = () => {
    let newState = this.state;
    newState.isRegister = true;
    newState.isLogin = false;
    this.setState(newState);
  };
  _selectLogin = () => {
    let newState = this.state;
    newState.isRegister = false;
    newState.isLogin = true;
    this.setState(newState);
  };
  _selectProfile = () => {
    let newState = this.state;
    newState.isRegister = false;
    newState.isLogin = false;
    this.setState(newState);
  };
  _updateErrMsg = (msg) => {
    if (typeof msg == "object") {
      msg = JSON.stringify(msg);
    }
    let newState = this.state;
    newState.errMsg = msg;
    this.setState(newState);
  };
  _renderOptions = () => {
    return (
      <div className="col-lg-12 card p-card" style={{ minHeight: "30em" }}>
        <div className="row">
          <div className="col-lg-6 h-100">
            <img src={secureImage} style={{width:"100%"}}/>
          </div>
          <div className="col-lg-6 h-100 text-center">
            <div className="col-lg-12">
              <h4 style={{marginBottom:"150px"}}>Please select one of the following:</h4>
            </div>
            <div
              className="col-lg-12 d-inline"
              style={{ marginTop: "30%" }}
            >
              <button
                onClick={this._selectLogin}
                className="btn btn-primary btn-lg"
              >
                Login
              </button>
              <p
                style={{
                  display: "inline",
                  marginRight: "30px",
                  marginLeft: "30px",
                }}
              >
                Or
              </p>
              <button
                onClick={this._selectRegister}
                className="btn btn-primary btn-lg"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  _renderLogin = () => {
    return (
      <LoginView
        toggleBack={this._selectProfile}
        updateErrMsg={this._updateErrMsg}
        updateUser={this.props.updateUser}
      />
    );
  };
  _renderRegister = () => {
    return (
      <RegisterView
        toggleBack={this._selectProfile}
        updateErrMsg={this._updateErrMsg}
        updateUser={this.props.updateUser}
      />
    );
  };
  _renderProfile = () => {
    var date = new Date(this.props.user.dateCreated);
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    var formattedDate = month + "/" + day + "/" + year;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4" style={{ flex: "1" }}>
            <div className="card p-card" style={{ minHeight: "100%" }}>
              <div className="col-lg-12 text-center">
                <img
                  src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  className="img-fluid"
                  style={{ width: "150px", borderRadius: "50%" }}
                />
              </div>

              <div className="col-lg-12" style={{ marginTop: "30px" }}>
                <h5 style={{ fontWeight: "bold" }}>My Profile:</h5>
              </div>
              <div className="row" style={{ marginTop: "2em" }}>
                <div className="col-lg-6">
                  <h5 style={{ fontWeight: "500" }}>Name:</h5>
                </div>
                <div className="col-lg-6">
                  <p style={{ float: "right", textAlign: "end" }}>
                    {this.props.user.name}
                  </p>
                </div>
                <div className="col-lg-7" style={{ marginTop: "15px" }}>
                  <h5 style={{ fontWeight: "500" }}>Date Created:</h5>
                </div>
                <div className="col-lg-5" style={{ marginTop: "15px" }}>
                  <p style={{ float: "right" }}>{formattedDate}</p>
                </div>
              </div>
              <div className="row" style={{ flex: "1" }}>
                <div className="col-lg-12">
                  <button
                    onClick={this._fetchLogout}
                    className="btn btn-primary"
                    style={{ position: "absolute", bottom: "0" }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 stackem">
            <div className="card p-card" style={{ marginBottom: "2em" }}>
              <div className="col-lg-12">
                <h5 style={{ fontWeight: "bold" }}>My Orders:</h5>
              </div>
            </div>
            <div className="card p-card">
              <div className="col-lg-12">
                <h5 style={{ fontWeight: "bold" }}>Billing Info:</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div
            className={
              "alert alert-danger " +
              (this.state.errMsg.length == 0 ? "my-hide" : "")
            }
            role="alert"
          >
            {this.state.errMsg}
          </div>
        </div>
        {this.props.user
          ? this._renderProfile()
          : !this.props.user && this.state.isLogin
          ? this._renderLogin()
          : !this.props.user && this.state.isRegister
          ? this._renderRegister()
          : this._renderOptions()}
      </div>
    );
  }
}
