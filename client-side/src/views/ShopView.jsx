import React from "react";
import {Spring} from 'react-spring/renderprops'

import Item from "../components/Item";

export default function CartView (props){
    const itemList = () =>{
        return props.items.map((item,key)=>{
            return(
                    <div key={"item"+key} className="col-lg-4" style={{marginTop:"20px"}}>
                        <Item data={item} addItemToCart={props.addItemToCart}/>
                    </div>
            )
        });
    }
    return(
        <>
            <Spring
                from={{marginTop:-1500,opacity:0}}
                to={{marginTop:0,opacity:1}}
            >
            {props=>(
                <div style={props} className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center">Items:</h1>
                        </div>
                    </div>
                    <div className="row">
                        {itemList()}
                    </div>
                </div>
            )}
            </Spring>
        </>
    );
    
}