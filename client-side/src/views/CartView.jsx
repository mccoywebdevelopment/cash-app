import React from "react";

import CartItems from "../components/CartItems";
import CartTotal from "../components/CartTotal";

export default class CartView extends React.Component{
    constructor(props){
        super(props);
    }
    _getTotal=()=>{
        var total = 0;
        for(var i=0;i<this.props.items.length;++i){
            if(this.props.items[i].quantity){
                total = total + this.props.items[i].quantity * this.props.items[i].price;
            }else{
                total = total + this.props.items[i].price;
            }
        }
        return total;
    }
    render(){
        return(
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1>Cart:</h1>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-8">
                            <CartItems items={this.props.items}/>
                        </div>
                        <div className="col-lg-4">
                            <CartTotal total={this._getTotal()}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}