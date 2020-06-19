const mongoose = require("mongoose");
const SALT_WORK_FACTOR = 12;
const bcrypt   = require('bcrypt-nodejs');

var CustomerSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,min:8,required:true},
    dateCreated:{type:Date,default:new Date()},
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

CustomerSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password') ){
        next();
    }else{
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err){
                next(err);
            }else{
                // hash the password using our new salt
            bcrypt.hash(user.password, salt,null,function(err, hash) {
                if (err){
                    next(err);
                }else{
                    // override the cleartext password with the hashed one
                    user.password = hash;
                    next();
                }
            });
            }
        });
    }
});

CustomerSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        if(!isMatch){
            cb("Invalid password");
        }else{
            cb(null, isMatch);
        }
    });
};

module.exports = mongoose.model("Customer", CustomerSchema);