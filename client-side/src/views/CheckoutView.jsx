import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import stripePic from "./images/stripe.svg"
import { STRIPE_API_KEY } from "../config/secret"
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

export default class CheckoutView extends React.Component{
    constructor(props){
        super(props);
        
        // if(!this.props.user){
        //     this.props.nav("profile");
        // }
    }
    _renderBilling = () =>{
        const stripePromise = loadStripe(STRIPE_API_KEY);
        const CARD_ELEMENT_OPTIONS = {
            style:{
            base: {
                padding: '.375rem .75rem',
                fontSize:"1.5rem",
                color: '#495057',
                backgroundColor: '#fff',
                backgroundClip: 'padding-box',
                border: '1px solid #ced4da',
                borderRadius: '.25rem',
                transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
        
                "::placeholder": {
                  color: "#CFD7DF",
                  fontSize:"1.5rem"
                }
              },
              invalid: {
                color: "#E25950"
              }
          }}
        return(
            <>
                <div className="col-lg-6 stripe-border">
                    <label>Card Details:</label>
                    <Elements stripe={stripePromise}>
                        <CardElement options={CARD_ELEMENT_OPTIONS} class="form-control" style={{height: '2.4em',paddingTop: '.7em'}}/>
                    </Elements>
                    <div className="row" style={{marginTop:'30px'}}>
                            <div className="col-lg-12">
                                <p style={{color:"#6c757d"}}>3D Security by:</p>
                            </div>
                            <div className="col-lg-12">
                                <img style={{height:'30px'}} src={stripePic}/>
                            </div>
                    </div>
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