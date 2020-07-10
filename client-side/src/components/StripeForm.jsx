import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React from "react";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
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
          <button className="btn btn-primary" style={{width:"100%",marginTop:"10%"}} type="submit" disabled={!stripe}>
              Pay
          </button>
      </form>
  );
};

export default StripeForm;