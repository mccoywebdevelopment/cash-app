const express = require('express');
const router = express.Router();
const validate = require('../config/validation');
const passport = require('passport');
const JWTKey = process.env.JWTKey || require('../config/secret').JWTKey;
const jwt = require("jsonwebtoken");
const CustomerModel = require('../models/Customer');
// const DeleteCustomerModel = require('../models/DeletedCustomer');

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
          console.log(1);
          console.log(err);
            return res.status(400).json({errorMsg:err});
        }else if(!doc){
          console.log("None");
            return res.status(400).json({errorMsg:"User not found."});
        }else{
            doc.comparePassword(password,(err,isMatch)=>{
                if(err){
                  console.log(8);
                  console.log(err);
                    return res.status(400).json({errorMsg:err});
                }else{
                    doc.signJWT((err,jwt)=>{
                        if(err){
                          console.log(9);
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
        const user = jwt.verify(jwtToken, JWTKey);
        if(user.id != req.body.userID){
            return res.status(400).json({errorMsg:"body.userID != decoded user"});
        }else{
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

// router.route('/delete-account')
// .post(passport.authenticate('jwt', { session: false }),(req,res)=>{
//     const jwtToken = req.headers.authorization.split(' ')[1];
//     const user = jwt.verify(jwtToken, JWTKey);
//     CustomerModel.findOneAndDelete({_id:user.id},(err,user)=>{
//         if(err){
//             return res.status(400).json({errorMsg:err});
//         }else if(!user){
//             return res.status(400).json({errorMsg:"User not found."});
//         }else{
//             console.log(user);
//             var deleted = new DeleteCustomerModel(user);
//             deleted.save((err,result)=>{
//                 if(err){
//                     return res.status(400).json({errorMsg:err});
//                 }else{
//                     return res.status(200).json({result:"Deleted"});
//                 }
//             });
//         }
//     });

// });

module.exports = router;
