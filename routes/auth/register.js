const router = require("express").Router();
let User = require("../../models/user.model");
var bcrypt = require('bcryptjs');


router.route("/").post((req, res)=>{
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const noHashedPassword = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(noHashedPassword, salt);
    let songs = []

 
    const newUser = new User({email, password, firstName, lastName, songs});

    newUser.save()
        .then(()=> {
            res.status(200).json("New user added added")
            console.log("New user added...")    
        })
        .catch(err=> {
            if(err.code == 11000){
                res.status(400).json("Error" + err)
            }
            res.status(401).json("Error" + err);
        });
}); 



module.exports = router;