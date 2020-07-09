const express = require('express');
const router = express.Router();

router.route("/create")
.post((req,res)=>{
    res.send("success!");
});

module.exports = router;