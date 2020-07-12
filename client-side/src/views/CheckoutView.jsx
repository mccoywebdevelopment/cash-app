import React from "react";
import stripePic from "./images/stripe.svg";
import { API_BASE_URL } from "../config/variables";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "react-copy-to-clipboard";
import BarLoader from "react-spinners/BarLoader";
import jwt_decode from "jwt-decode";

import StripeForm from "../components/StripeForm";

export default class CheckoutView extends React.Component {
  state = {
    showDetails: false,
    creditCardNumber: "4242424242424242",
    creditCardExp: "2/23",
    creditCardCVC: "675",
    CLIENT_SECRET: null,
    total: null,
    errMsg: "",
    successMsg: "",
    copiedText:""
  };
  constructor(props) {
    super(props);
    if (!this.props.user) {
      this.props.nav("profile");
    }
  }
  _toggleCopiedText = (text) =>{
    let newState = this.state;
    newState.copiedText = text;
    this.setState(newState);
  }
  _toggleSuccessMsg = () => {
    let newState = this.state;
    newState.successMsg = "Successfully created payment.";
    this.setState(newState);
    this._fetchUpdateOrder();
    this.props.reset();
    setTimeout(() => {
      this.props.nav("profile");
    }, 3000);
  };
  componentDidMount = () => {
    this._fetchClientSecrete();
  };
  _fetchUpdateOrder = async () => {
    const bearer = "Bearer " + localStorage.getItem("jwt");
    await fetch(API_BASE_URL + "/payment/update-order", {
      method: "POST",
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
        }else{
          var jwt = responseData.jwt;
          var user = jwt_decode(jwt);

          localStorage.setItem("jwt",jwt);
          this.props.updateUser(user);
        }
      });
  };
  _toggleDetails = () => {
    let newState = this.state;
    newState.showDetails = !newState.showDetails;
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
  _fetchClientSecrete = async () => {
    const bearer = "Bearer " + localStorage.getItem("jwt");
    await fetch(API_BASE_URL + "/payment/send-intent", {
      body: JSON.stringify({ items: this.props.items }),
      method: "POST",
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
          let newState = this.state;
          newState.CLIENT_SECRET = responseData.client_secret;
          newState.total = responseData.total;
          this.setState(newState);
        }
      });
  };
  _renderPayment = () => {
    return <></>;
  };
  render() {
    var text = "View test credit card values";
    if (this.state.showDetails) {
      text = "Hide test credit card values";
    }
    return (
      <div className="row">
        <div className="col-lg-12">
          {this.state.errMsg.length > 0 ? (
            <div
              className={
                "alert alert-danger " +
                (this.state.errMsg.length == 0 ? "my-hide" : "")
              }
              role="alert"
            >
              {this.state.errMsg}
            </div>
          ) : (
            <div
              className={
                "alert alert-success " +
                (this.state.successMsg.length == 0 ? "my-hide" : "")
              }
              role="alert"
            >
              {this.state.successMsg}
            </div>
          )}
        </div>
        <div className="col-lg-12 text-center">
          <h1>Checkout:</h1>
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div
              className="col-lg-12 card p-card"
              style={{ minHeight: "30em", marginBottom: "100px" }}
            >
              <div className="row">
                <div className="col-lg-12 stripe-border">
                  <p
                    onClick={() => {
                      this._toggleDetails();
                    }}
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "#51B8C8",
                      width:'fit-content',
                      fontSize:"20px"
                    }}
                  >
                    {text}
                  </p>
                  {this.state.showDetails ? (
                    <>
                      <div className="form-group row">
                        <div className="col-lg-6">
                          <label for="inputEmail3">Card number</label>
                          <div className="input-group ">
                            <input
                              type="text"
                              className={"form-control "+(this.state.creditCardNumber == this.state.copiedText?'copy-input':'')}
                              id="inlineFormInputGroupUsername2"
                              value={this.state.creditCardNumber}
                            />
                            <CopyToClipboard text={this.state.creditCardNumber}>
                              <div onClick={()=>{this._toggleCopiedText(this.state.creditCardNumber)}} className="input-group-addon">
                                <div
                                  className={"input-group-text "+(this.state.creditCardNumber == this.state.copiedText?'copy-input':'')}
                                  style={{
                                    height: "100%",
                                    borderTopLeftRadius: "0px",
                                    borderBottomLeftRadius: "0px",
                                    cursor: "pointer",
                                  }}>
                                  {this.state.creditCardNumber == this.state.copiedText?
                                  <>Copied!</>
                                  :
                                  <FontAwesomeIcon
                                    icon={faClipboard}
                                    color="black"
                                  />
                                  }
                                </div>
                              </div>
                            </CopyToClipboard>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label for="inputEmail3">Exp Date</label>
                          <div className="input-group ">
                            <input
                              type="text"
                              className={"form-control "+(this.state.creditCardExp == this.state.copiedText?'copy-input':'')}
                              id="inlineFormInputGroupUsername2"
                              value={this.state.creditCardExp}
                            />
                            <CopyToClipboard text={this.state.creditCardExp}>
                              <div onClick={()=>{this._toggleCopiedText(this.state.creditCardExp)}} className="input-group-addon">
                                <div
                                  className={"input-group-text "+(this.state.creditCardExp == this.state.copiedText?'copy-input':'')}
                                  style={{
                                    height: "100%",
                                    borderTopLeftRadius: "0px",
                                    borderBottomLeftRadius: "0px",
                                    cursor: "pointer",
                                  }}
                                >
                                {this.state.creditCardExp == this.state.copiedText?
                                  <>Copied!</>
                                  :
                                  <FontAwesomeIcon
                                    icon={faClipboard}
                                    color="black"
                                  />
                                  }
                                </div>
                              </div>
                            </CopyToClipboard>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label for="inputEmail3">CVC</label>
                          <div className="input-group ">
                            <input
                              type="text"
                              className={"form-control "+(this.state.creditCardCVC == this.state.copiedText?'copy-input':'')}
                              id="inlineFormInputGroupUsername2"
                              value={this.state.creditCardCVC}
                            />
                            <CopyToClipboard text={this.state.creditCardCVC}>
                              <div  onClick={()=>{this._toggleCopiedText(this.state.creditCardCVC)}} className="input-group-addon">
                                <div
                                  className={"input-group-text "+(this.state.creditCardCVC == this.state.copiedText?'copy-input':'')}
                                  style={{
                                    height: "100%",
                                    borderTopLeftRadius: "0px",
                                    borderBottomLeftRadius: "0px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {this.state.creditCardCVC == this.state.copiedText?
                                  <>Copied!</>
                                  :
                                  <FontAwesomeIcon
                                    icon={faClipboard}
                                    color="black"
                                  />
                                  }
                                </div>
                              </div>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </>
                  ) : null}
                  <label>Card Details:</label>
                  {this.state.CLIENT_SECRET ? (
                    <StripeForm
                      toggleSuccessMsg={this._toggleSuccessMsg}
                      total={this.state.total}
                      CLIENT_SECRET={this.state.CLIENT_SECRET}
                    />
                  ) : (
                    <div style={{ marginTop: "30px" }}>
                      <BarLoader size={100} width={"100%"} color="#51B8C8" />
                    </div>
                  )}
                  <div className="row" style={{ marginTop: "30px" }}>
                    <div className="col-lg-12">
                      <p style={{ color: "#6c757d" }}>3D Security by:</p>
                    </div>
                    <div className="col-lg-12">
                      <img style={{ height: "30px" }} src={stripePic} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
