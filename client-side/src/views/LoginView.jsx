import React from "react";

export default class LoginView extends React.Component {
  state = {
      email:"",
      password:""
  }
  constructor(props) {
    super(props);
  }
  _togglePassword = (e) =>{
    let newState = this.state;
    newState.password = e.target.value;
    this.setState(newState);
  }
  _toggleEmail = (e) =>{
    let newState = this.state;
    newState.email = e.target.value;
    this.setState(newState);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="container" style={{ marginTop: "3em" }}>
            <div className="row card p-card" style={{ minHeight: "30em" }}>
              <div className="col-lg-12 text-center">
                <h1>Login:</h1>
              </div>
              <div className="col-lg-6 offset-lg-3" style={{ marginTop: "4em" }}>
                <label for="email">Email</label>
                <input type="email" onChange={this._toggleEmail.bind(this)} className="form-control" value={this.state.email} id="email" placeholder="you@example.com"/>
                <div className="invalid-feedback">
                    Please enter a valid email address.
                </div>
              </div>
              <div className="col-lg-6 offset-lg-3" style={{ marginTop: "2em" }}>
                <label for="password">Password</label>
                <input type="password" onChange={this._togglePassword.bind(this)} className="form-control" value={this.state.password} id="email" placeholder="password"/>
                <div className="invalid-feedback">
                    Please enter a valid password.
                </div>
              </div>
              <div className="row">
              <div className="col-lg-3 offset-lg-3" style={{marginTop:"2em"}}>
                <button onClick={this.props.toggleBack} className="btn btn-primary btn-lg">Back</button>
              </div>
              <div className="col-lg-3" style={{marginTop:"2em"}}>
                <button className="btn btn-primary btn-lg float-right">Login</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
