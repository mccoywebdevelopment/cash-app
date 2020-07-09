import React from "react";

export default class CheckoutView extends React.Component{
    constructor(props){
        super(props);
        
        if(!this.props.user){
            this.props.nav("profile");
        }
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
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}