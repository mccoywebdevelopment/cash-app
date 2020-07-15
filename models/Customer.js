const mongoose = require("mongoose");
const SALT_WORK_FACTOR = 12;
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const JWTKey = process.env.JWTKey || require("../config/secret").JWTKey;
const CartModel = require('./Cart');
const ItemModel = require('./Item');

var CustomerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, min: 8, required: true, select: false },
  dateCreated: { type: Date, default: new Date() },
  name: { type: String, required: true },
  expTokens: [
    {
      type: String,
    },
  ],
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",

    },
  ],
});

CustomerSchema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) {
        next(err);
      } else {
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
          if (err) {
            next(err);
          } else {
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
          }
        });
      }
    });
  }
});

CustomerSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    } else if (!isMatch) {
      cb("Invalid password");
    } else {
      cb(null, isMatch);
    }
  });
};

CustomerSchema.methods.signJWT = function (done) {
  populateOrders(this.orders,(err,result)=>{
    if(err){
      done(err);
    }else{
      const payload = {
        id: this._id,
        username: this.username,
        name: this.name,
        dateCreated: this.dateCreated,
        orders: result
      };
      jwt.sign(payload, JWTKey, { expiresIn: 172800 }, (err, token) => {
        if (err) {
          done(err);
        } else {
          done(null, token);
        }
      });
    }
  });
};

//biggest to smallest
function sortOrders(orders){
  if(orders.length>0){
    var isSorted = true;
    for(var i=1;i<orders.length;++i){
      var lastElement = orders[i-1]
      var currElement = orders[i];
      if(currElement.dateCreated>lastElement.dateCreated){
        isSorted = false;
        orders[i] = lastElement;
        orders[i-1] = currElement;
      }
    }

    if(!isSorted){
      return sortOrders(orders);
    }else{
      return orders;
    }
  }else{
    return [];
  }
}


function populateOrders(orders,callback){
  if(orders.length==0){
    callback(null,[]);
  }else{
    var count = 0;
    var errors = [];
    var arrOrders = [];

    orders.forEach(orderID =>{
      CartModel.findById(orderID,(err,orderFound)=>{
        if(err){
          errors.push(err);
        }else{
          populateItems(orderFound.items,(err,items)=>{
            if(err){
              errors.push(err);
            }else{
              orderFound.items = items;
              arrOrders.push(orderFound);
            }
            count++;
            if(count == orders.length){
              arrOrders = sortOrders(arrOrders);
              callback(null,arrOrders);
            }
          });
        }
      });
    });
  }
}
function populateItems(items,callback){
  if(items.length==0){
    callback(null,[]);
  }else{
    var count = 0;
    var errors = [];
    var arrItems = [];
    items.forEach(element => {
      ItemModel.findById(element.item,(err,item)=>{
        if(err){
          errors.push(err);
        }else if(item){
          arrItems.push({item:item,quantity:element.quantity});
        }
        count++;
        if(count == items.length){
          callback(null,arrItems);
        }
      });
    });
  }
}

module.exports = mongoose.model("Customer", CustomerSchema);
