const express = require('express');
const router = express.Router();
const validate = require('../config/validation');
const ItemModel = require('../models/Item');

router.route('/create')
.post((req,res)=>{
    const imgURL = req.body.imageURL;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    var newItem = new ItemModel({
        title:title,
        imageURL:imgURL,
        price:price,
        description:description
    });

    newItem.save((err,doc)=>{
        if(err){
            return res.status(400).json({errorMsg:err});
        }else{
            return res.status(200).json({sucessMsg:"Item Created."});
        }
    });
});

router.route('/')
.post((req,res)=>{
    setTimeout(()=>{
        ItemModel.find({},(err,items)=>{
            if(err){
                return res.status(400).json({errorMsg:err});
            }else{
                return res.json({items});
            }
        });
    },0);
});

module.exports = router;