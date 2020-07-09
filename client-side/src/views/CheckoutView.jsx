import React from "react";

export default class CheckoutView extends React.Component{
    constructor(props){
        super(props);
        
        // if(!this.props.user){
        //     this.props.nav("profile");
        // }
    }
    _renderBilling = () =>{
        return(
            <>
                <div className="col-lg-12" style={{marginBottom:"30px"}}>
                    <h4>Billing Details</h4>
                </div>
                <div class="col-lg-6 form-group">
                    <label for="exampleInputEmail1">First & last Name</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
            </>
        );
    }
    _renderPayment = () =>{
        return(
            <>
            </>
        );
    }
    render(){
        return(
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1>Checkout:</h1>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12 card p-card" style={{ minHeight: "30em" }}>
                            <div className="row">
                               {this._renderBilling()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}