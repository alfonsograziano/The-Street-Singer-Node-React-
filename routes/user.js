const router = require("express").Router();
let User = require("../models/user.model");
let Song = require("../models/song.model");

var bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

require("dotenv").config();


router.route("/getName").get((req, res) => {
   console.log(req.decoded.user)
   const email = req.decoded.user;
   User.findOne({ email: email })
      .then(user => {
         res.status(200).json({ firstName: user.firstName, lastName: user.lastName })
      })
      .catch(err => res.status(401).json("Error" + err));
});

router.route("/getSongs").get((req, res) => {
   console.log(req.decoded.user)
   const email = req.decoded.user;
   User.findOne({ email: email })
      .then(user => {
         Song.find({
            '_id': { $in: user.songs }
         }, function (err, docs) {
            if(err){
               console.log(err)
               res.status(404).json("Error" +err)
            }
            res.status(200).json(docs)
         });
      })
      .catch(err => res.status(400).json("Error" + err));
});



router.route("/lol").get((req, res) => {
   res.status(200).json("loool")

});


module.exports = router;

