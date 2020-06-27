import React from "react";

export default class RegisterView extends React.Component {
  state = {
      email:"",
      password:""
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="container" style={{ marginTop: "3em" }}>
            <div className="row card p-card" style={{ minHeight: "30em" }}>
              <div className="col-lg-12 text-center">
                <h1>Register:</h1>
              </div>
              <div className="col-lg-6 offset-lg-3" style={{ marginTop: "4em" }}>
                <label for="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
                <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                </div>
              </div>
              <div className="col-lg-6 offset-lg-3" style={{ marginTop: "2em" }}>
                <label for="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
                <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
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
