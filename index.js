const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const db = process.env.MONGO_URI || require("./config/secret").mongoTestingURI;
const port = process.env.PORT || 4000;
const passport = require("passport");
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

if(process.env.NODE_ENV ==='production'){
  const root = require('path').join(__dirname, 'client-side', 'build')
  app.use(express.static(root));
  app.get("*", (req, res) => {
      res.sendFile('index.html', { root });
  });
  app.get("/*", (req, res) => {
      res.sendFile('index.html', { root });
  });
}else{
  app.use(cors());
}

require('./config/loadItems');

app.use('/customer',require('./routes/Customer'));
app.use('/item',require('./routes/Item'));
app.use(passport.authenticate('jwt', { session: false }));
app.use('/payment',require('./routes/Payment'));

app.listen(port, () => console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nServer up and running on port ${port} !`));
