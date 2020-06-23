import React from "react";

export default class ProfileView extends React.Component{
    constructor(props){
        super(props);
    }
    _renderProfile = () =>{
        return(
                <div class="container" style={{marginTop:'3em'}}>
                    <div class="row">
                        <div class="col-md-4" style={{flex:'1'}}>
                            <div class="card p-card" style={{minHeight:'100%'}}>
                                <div class="col-lg-12 text-center">
                                    <img src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                        class="img-fluid" style={{width:'150px',borderRadius:'50%'}}/>
                                </div>
                                
                                <div class="col-lg-12" style={{marginTop:'30px'}}>
                                    <h5 style={{fontWeight:'bold'}}>My Profile:</h5>
                                </div>
                                <div class="row" style={{marginTop:'5em'}}>
                                    <div class="col-lg-6">
                                        <h5 style={{fontWeight:'500'}}>Name:</h5>
                                    </div>
                                    <div class="col-lg-6">
                                        <p style={{float:'right'}}>Chris McCoy</p>
                                    </div>
                                    <div class="col-lg-7" style={{marginTop:'30px'}}>
                                        <h5 style={{fontWeight:'500'}}>Date Created:</h5>
                                    </div>
                                    <div class="col-lg-5" style={{marginTop:'30px'}}>
                                        <p style={{float:'right'}}>12/17/2020</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 stackem">
                            <div class="card p-card" style={{marginBottom:'2em'}}>
                                <div class="col-lg-12">
                                    <h5 style={{fontWeight:'bold'}}>My Orders:</h5>
                                </div>
                            </div>
                            <div class="card p-card">
                                <div class="col-lg-12">
                                    <h5 style={{fontWeight:'bold'}}>Billing Info:</h5>
                                </div>
                            </div>
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