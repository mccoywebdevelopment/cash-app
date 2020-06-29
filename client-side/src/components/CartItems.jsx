import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class CartItems extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="card" style={{padding:"8px"}}>
                <div className="row">
                    <div className="col-lg-4">
                        <img className="img-fluid" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg-10">
                                <h2>Headphones</h2>
                            </div>
                            <div className="col-lg-2">
                                <FontAwesomeIcon icon={faTimes} color="red" style={{float:"right",fontSize:"25px",cursor:"pointer"}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}