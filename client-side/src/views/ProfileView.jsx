import React from "react";

export default class ProfileView extends React.Component{
    constructor(props){
        super(props);
    }
    _renderProfile = () =>{
        return(
            <div className="col-lg-10 offset-lg-1 card" style={{minHeight:'30em'}}>
                {/* <div className="card">
                    <img className="card-img-top" src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-lg-8">
                        <h1>Christopher McCoy</h1>
                        <h5>cmmccoy1996@gmail.com</h5>
                    </div>
                    <div className="col-lg-4">
                        <p className="float-right">Date Created:12/21/2019</p>
                    </div>
                </div>
            </div>
        )
    }
    render(){
        return(
        <div className="container">
            <div className="row" style={{marginTop:'5em'}}>
                {this.props.user?
                    this._renderProfile()
                :null
                }
            </div>
        </div>
        )
    }
}