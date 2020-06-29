import React from "react";

import CartItems from "../components/CartItems";
import CartTotal from "../components/CartTotal";

export default class CartView extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1>Cart:</h1>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-8">
                            <CartItems/>
                        </div>
                        <div className="col-lg-4">
                            <CartTotal/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}