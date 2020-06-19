const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const db = require("./config/secret").mongoURI;
const port = process.env.PORT || 4000;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use('/customer',require('./routes/Customer'));

app.listen(port, () => console.log(`Server up and running on port ${port} !`));