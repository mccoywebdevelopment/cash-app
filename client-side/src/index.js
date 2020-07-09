import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import * as serviceWorker from "./serviceWorker";

const stripePromise = loadStripe("pk_test_ttj4Nu9PA6N5g7X552cLoPqF");

ReactDOM.render(
  <React.StrictMode>
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700"
      rel="stylesheet"
    ></link>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
