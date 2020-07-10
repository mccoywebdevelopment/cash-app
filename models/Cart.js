const mongoose = require("mongoose");

var CartSchema = new mongoose.Schema({
    dateCreated:{type: Date, required: true, default: Date.now()},
    totalPrice:{type: Number, requried: true},
    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
});

module.exports = mongoose.model("Cart", CartSchema);