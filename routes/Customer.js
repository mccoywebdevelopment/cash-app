const express = require('express');
const router = express.Router();
const validate = require('../config/validation');
const passport = require('passport');
const CustomerModel = require('../models/Customer');

router.route('/register')
.post((req,res)=>{
    var { errors, isValid } = validate.validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json({errors});
    }else{
        CustomerModel.findOne({username:req.body.email},(err,doc)=>{
            if(err){
                return res.status(400).json({errorMsg:err});
            }else if(doc){
                return res.status(400).json({errorMsg:"User already exists."});
            }else{
                const newCustomer = new CustomerModel({
                    name:req.body.name,
                    username:req.body.email,
                    password:req.body.password
                });
                CustomerModel.create(newCustomer,(err,docCreated)=>{
                    if(err){
                        return res.status(400).json({errorMsg:err});
                    }else{
                        docCreated.signJWT((err,jwt)=>{
                            if(err){
                                return res.status(400).json({errorMsg:err});
                            }else{
                                return res.status(200).json({jwt:jwt});
                            }
                        });
                    }
                });
            }
        });
    }
});

router.route('/login')
.post((req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    CustomerModel.findOne({username:email}).select('+password').exec((err,doc)=>{
        if(err){
            return res.status(400).json({errorMsg:err});
        }else if(!doc){
            return res.status(400).json({errorMsg:"User not found."});
        }else{
            doc.comparePassword(password,(err,isMatch)=>{
                if(err){
                    return res.status(400).json({errorMsg:err});
                }else{
                    doc.signJWT((err,jwt)=>{
                        if(err){
                            return res.status(400).json({errorMsg:err});
                        }else{
                            return res.status(200).json({jwt:jwt});
                        }
                    });
                }
            });
        }
    });
});

router.route('/logout')
.post(passport.authenticate('jwt',{ session: false}),(req,res)=>{
    if (!req.headers.authorization || !req.headers.authorization.split(' ')[0] === 'Bearer') {
        return res.status(400).json({errorMsg:"No token provided."});
    }else if(!req.body.userID){
        return res.status(400).json({errorMsg:"Please provide req.body.userID"});
    }else{
        const jwtToken = req.headers.authorization.split(' ')[1];
        CustomerModel.findById(req.body.userID,(err,doc)=>{
            if(err){
                return res.status(400).json({errorMsg:err});
            }else{
                doc.expTokens.push(jwtToken);
                doc.save((err,docSaved)=>{
                    if(err){
                        return res.status(400).json({errorMsg:err});
                    }else{
                        return res.status(200).json({result:"Logged out"});
                    }
                });
            }
        });
    }
});

router.route('/find/all')
.post(passport.authenticate('jwt', { session: false }),(req,res)=>{
    CustomerModel.find({},(err,docs)=>{
        if(err){
            return res.status(400).json({errorMsg:err});
        }else{
            return res.status(200).json({result:docs});
        }
    });
});

module.exports = router;