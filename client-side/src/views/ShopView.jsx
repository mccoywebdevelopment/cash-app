import React from "react";

import Item from "../components/Item";

export default class CartView extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.items);
    }
    render(){
        const itemList = () =>{
            return this.props.items.map((item,key)=>{
                return(
                    <div key={"item"+key} className="col-lg-4" style={{marginTop:"20px"}}>
                        <Item data={item} addItemToCart={this.props.addItemToCart}/>
                    </div>
                )
            });
        }
        return(
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center">Items:</h1>
                        </div>
                    </div>
                    <div className="row">
                        {itemList()}
                    </div>
                </div>
            </>
        );
    }
}