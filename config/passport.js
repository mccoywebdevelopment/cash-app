const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const CustomerModel = require("../models/Customer");
const passportKey = process.env.JWTKey || require("./secret").JWTKey;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = passportKey;
opts.passReqToCallback = true;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (req, jwt_payload, done) => {
      CustomerModel.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
              const jwtToken = req.headers.authorization.split(' ')[1];
              for(var i=0;i<user.expTokens.length;++i){
                if(user.expTokens[i] == jwtToken){
                  return done(null,false);
                }
              }
              return done(null, user);
            }
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};