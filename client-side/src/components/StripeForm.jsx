import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React from "react";

const StripeForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(props.CLIENT_SECRET, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        props.toggleSuccessMsg();
      }
    }
  };
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        padding: ".375rem .75rem",
        fontSize: "1.5rem",
        color: "#495057",
        backgroundColor: "#fff",
        backgroundClip: "padding-box",
        border: "1px solid #ced4da",
        borderRadius: ".25rem",
        transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",

        "::placeholder": {
          color: "#CFD7DF",
          fontSize: "1.5rem",
        },
      },
      invalid: {
        color: "#E25950",
      },
    },
  };

  return (
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_ELEMENT_OPTIONS}/>
          <h1 style={{marginTop:'30px'}}>Total: ${props.total.toFixed(2)}</h1>
          <button className="btn btn-primary" style={{width:'30%',marginTop:'30px'}} type="submit" disabled={!stripe}>
              Pay
          </button>
      </form>
  );
};

export default StripeForm;