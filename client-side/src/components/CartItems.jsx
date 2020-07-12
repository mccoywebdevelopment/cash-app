import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class CartItems extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const list = ()=>{
            return this.props.items.map((item,index)=>{
                return(
                    <div className="card" style={{padding:"20px",marginBottom:"30px"}}>
                        <div className="row">
                            <div className="col-lg-4">
                                <img className="img-fluid" src={item.imageURL}/>
                            </div>
                            <div className="col-lg-8">
                                <div className="row" style={{height:"100%"}}>
                                    <div className="col-lg-10">
                                        <h2>{item.title}</h2>
                                    </div>
                                    <div className="col-lg-2">
                                        <FontAwesomeIcon onClick={()=>{this.props.delete(item)}} icon={faTimes} color="black" style={{float:"right",fontSize:"25px",cursor:"pointer"}}/>
                                    </div>
                                    <div className="col-lg-6">
                                        <h5>Price: ${item.price}</h5>
                                    </div>
                                    <div className="col-lg-5 offset-lg-1">
                                        <p>Quantity:</p>
                                        <div>
                                            {item.quantity==1 || !item.quantity?
                                                <span className="input-number-decrement my-disable">–</span>
                                            :
                                                <span onClick={()=>{this.props.remove(item)}} className="input-number-decrement">–</span>
                                            }
                                            <input className="input-number" type="text" value={item.quantity || 1} min="0" max="10"/>
                                            <span onClick={()=>{this.props.add(item)}} className="input-number-increment">+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        }
        return(
            <>
                {list()}
            </>
        )
    }
}