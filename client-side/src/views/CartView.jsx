import React from "react";
import emptyImage from "./images/empty.svg";

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
    _renderItems = () =>{
        return(
            <>
                <div className="col-lg-8">
                    <CartItems delete={this.props.delete} add={this.props.add} remove={this.props.remove} items={this.props.items}/>
                </div>
                <div className="col-lg-4">
                    <CartTotal nav={this.props.nav} total={this._getTotal()}/>
                </div>
            </>
        );
    }
    render(){
        return(
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1>Cart:</h1>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        {this.props.items.length>0?
                            this._renderItems()
                        :   
                        <div className="col-lg-12 card p-card" style={{ minHeight: "30em" }}>
                            <div className="row">
                                <div className="col-lg-6 h-100">
                                    <img src={emptyImage} style={{width:"100%"}}/>
                                </div>
                                <div className="col-lg-6 h-100 text-center">
                                    <div className="col-lg-12">
                                        <h4 style={{marginBottom:"150px"}}>Looks like you have an empty cart.</h4>
                                        <p>Lets fix that <span onClick={()=>{this.props.nav('shop')}} style={{textDecoration:"underline",cursor:"pointer",color:"#51B8C8"}}>Continue Shopping</span>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}