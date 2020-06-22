const mongoose = require("mongoose");
const SALT_WORK_FACTOR = 12;
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const keys = require('../config/secret');

var CustomerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, min: 8, required: true, select: false },
  dateCreated: { type: Date, default: new Date() },
  token: { type: String, default: crypto.randomBytes(256), select: false },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

CustomerSchema.pre("save", function (next) {
  console.log("save");
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    console.log("Not modified");
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
    name: this.username,
  };
  jwt.sign(payload, keys.JWTKey, { expiresIn: 31556926 }, (err, token) => {
    if(err){
        done(err);
    }else{
        done(null,token);
    }
  });
};

module.exports = mongoose.model("Customer", CustomerSchema);
