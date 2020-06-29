const mongoose = require("mongoose");
const SALT_WORK_FACTOR = 12;
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const keys = require('../config/secret');

var CustomerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, min: 8, required: true, select: false },
  dateCreated: { type: Date, default: new Date() },
  name:{type:String, required: true},
  expTokens:[{
    type:String
  }],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
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
            console.log("Done");
            next();
          }
        });
      }
    });
  }
});

CustomerSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err){
      return cb(err);
    }
    else if (!isMatch) {
      cb("Invalid password");
    } else {
      console.log(true)
      cb(null, isMatch);
    }
  });
};

CustomerSchema.methods.signJWT = function (done) {
  const payload = {
    id: this._id,
    username: this.username,
    name: this.name,
    dateCreated: this.dateCreated,
    orders: this.orders
  };
  jwt.sign(payload, keys.JWTKey, { expiresIn: 172800 }, (err, token) => {
    if(err){
        done(err);
    }else{
        done(null,token);
    }
  });
};

module.exports = mongoose.model("Customer", CustomerSchema);
