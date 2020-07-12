const mongoose = require("mongoose");

var CartSchema = new mongoose.Schema({
    dateCreated:{type: Date, required: true, default: Date.now()},
    totalPrice:{type: Number, requried: true},
    items:[{
        quantity:{type:Number,required:true,default:1},
        item:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }
    }]
});

module.exports = mongoose.model("Cart", CartSchema);