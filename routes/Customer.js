const express = require('express');
const errors = require('../config/errors');
const router = express.Router();
const validate = require('../config/validation');
const CustomerModel = require('../models/Customer');

router.route('/register')
.post((req,res)=>{
    var { errors, isValid } = validate.validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json({errors});
    }else{
        CustomerModel.findOne({username:req.body.email},(err,doc)=>{
            console.log(doc);
            if(err){
                return res.status(400).json(err);
            }else if(doc){
                return res.status(400).json({errorMsg:"User already exists."});
            }else{
                const newCustomer = new CustomerModel({
                    username:req.body.email,
                    password:req.body.password
                });
                CustomerModel.create(newCustomer,(err,docCreated)=>{
                    if(err){
                        return res.status(400).json(err);
                    }else{
                        return res.status(200).json({sucessMsg:"Created customer!"});
                    }
                });
            }
        });
    }
});

module.exports = router;