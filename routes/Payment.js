const express = require('express');
const router = express.Router();
const {JWTKey} = require('../config/secret');
const jwt = require("jsonwebtoken");
const ItemModel = require('../models/Item');
const CustomerModel = require('../models/Customer');
const CartModel = require('../models/Cart');
const stripe = require('stripe')(require('../config/secret').stripeKey);

router.route("/send-intent")
.post((req,res)=>{
    const items = req.body.items;
    const jwtToken = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(jwtToken, JWTKey);

    returnCart(items,(err,newCart)=>{
        if(err){
            return res.status(400).json({errorMsg:err});
        }else{
            CustomerModel.findById(user.id,function(err,userFound){
                if(err){
                    return res.status(400).json({errorMsg:err});
                }else if(!userFound){
                    return res.status(400).json({errorMsg:"User not found."});
                }else{
                    userFound.cart = newCart;
                    userFound.save((err,savedDoc)=>{
                        if(err){
                            console.log("3");
                            return res.status(400).json({errorMsg:err});
                        }else{
                            var cents = savedDoc.cart.totalPrice * 100;
                            cents = parseInt(cents.toFixed(2));
                            stripe.paymentIntents.create({
                                amount: cents,
                                currency: 'usd',
                                payment_method_types: ['card'],
                            }).then((result)=>{
                                return res.status(200).json({client_secret: result.client_secret,total:savedDoc.cart.totalPrice})
                            });
                        }
                    })
                }
            });
        }
    });
});

router.route('/update-order')
.post((req,res)=>{
    const jwtToken = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(jwtToken, JWTKey);
    CustomerModel.findById(user.id,function(err,userFound){
        if(err){
            return res.status(400).json({errorMsg:err});
        }else if(!userFound){
            return res.status(400).json({errorMsg:"User not found."});
        }else{
            const cart = userFound.cart;
            userFound.cart = null;
            userFound.orders.push(cart);
            userFound.save((err,userSaved)=>{
                if(err){
                    return res.status(400).json({errorMsg:err});
                }else{
                    userSaved.signJWT((err,jwt)=>{
                        if(err){
                            return res.status(400).json({errorMsg:err});
                        }else{
                            console.log(true);
                            return res.status(200).json({jwt:jwt});
                        }
                    });
                }
            });
        }
    });
});

function returnCart(items,callback){
    var price = 0;
    var errors = [];
    var order = {};
    var newItems = [];
    var count = 0;
    if(items.length<1){
        callback("Didn't provide any items.");
    }else{
        items.forEach(element => {
            ItemModel.findById(element._id,function(err,itemFound){
                if(err){
                    errors.push(itemFound);
                }else if(!itemFound){
                    errors.push("Item: "+itemFound.title+" is not found.")
                }else{
                    var quantity = 1;
                    if(element.quantity === parseInt(element.quantity, 10) && element.quantity>0){
                        price = price + itemFound.price * element.quantity;
                        quantity = element.quantity;
                    }else{
                        price = price + itemFound.price;
                    }
                    itemFound.quantity = quantity;
                    newItems.push(itemFound);
                }
    
                if(count==items.length-1 && errors.length<1){
                    var cart = new CartModel({
                        items: newItems,
                        dateCreated: Date.now(),
                        totalPrice: price
                    })
                    cart.save((err,cartSaved)=>{
                        if(err){
                            callback(err);
                        }else{
                            callback(null,cartSaved)
                        }
                    });
                }else if(count==items.length-1){
                    callback(errors);
                }else{
                    count++;
                }
            });
        });
    }
}
module.exports = router;