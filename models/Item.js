const mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
    title:{type:String,required:true},
    imageURL:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String},
    quantity:{type:Number,require:true,default:1}
});

module.exports = mongoose.model("Item", ItemSchema);