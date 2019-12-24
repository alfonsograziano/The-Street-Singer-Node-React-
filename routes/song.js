const router = require("express").Router();
let Song = require("../models/song.model");
let User = require("../models/user.model");

const axios = require("axios");
require("dotenv").config()
const mongoose = require("mongoose");


router.route("/").get((req, res) => {
    Song.find()
        .then(song => res.json(song))
        .catch(err => res.status(404).json("Error" + err));
});


router.route("/add").post((req, res) => {

    let username = req.decoded.user
    const token = req.token;

    let _id = new mongoose.mongo.ObjectId();
    const title = req.body.title;
    const song = req.body.song;

    const newSong = new Song({ _id, title, song });

    newSong.save()
        .then(() => {

            User.findOne({ email: username })
                .then(user => {
                    user.songs.push(_id);
                    //console.log(user.tasks)
                    user.save()
                        .then(user => res.status(200).json("User updated, song added"))
                        .catch(err => {
                            res.status(400).json("Error" + err)
                            console.log(err)
                        });
                })
                .catch(err => res.status(404).json("Error" + err));
        })
        .catch(err => {
            res.status(400).json("Error" + err)
            console.log(err)
        });


});


router.route("/:id").get((req, res) =>{
    Song.findOne({_id: req.params.id})
        .then(song => res.json(song))
        .catch(err => res.status(404).json("Error" + err));
});




router.route("/:id").delete((req, res) => {
    const email = req.decoded.user;

    Song.findOneAndDelete({ _id: req.params.id })
        .then(task => {
            res.status(200).json("Song deleted...")
        })
        .catch(err => res.status(400).json("Error" + err));
});


router.route("/update/:id").post((req, res) => {
    console.log(req.body)
    Song.findOne({_id: req.params.id})
        .then(song => {
            song.title = req.body.title;
            song.song = req.body.song;
       
            song.save()
                .then(task => res.json("Song updated"))
                .catch(err => res.status(400).json("Error" + err));
        })
        .catch(err => res.status(404).json("Error" + err));
});

/*
router.route("/update/:id").post((req, res) => {
    console.log(req.body)
    Task.findById(req.params.id)
        .then(task => {
            task.title = req.body.title;
            task.description = req.body.description;
            task.done = req.body.done;
            task.priority = req.body.priority;
            task.date = Date.parse(req.body.date);

            task.save()
                .then(task => res.json("Task updated"))
                .catch(err => res.status(400).json("Error" + err));
        })
        .catch(err => res.status(404).json("Error" + err));
});
*/
/*



  
router.route("/update/:id").post((req, res) =>{
    Task.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
            .then(exercise => res.json("Exercise updated"))
            .catch(err => res.status(400).json("Error" + err));
        })
        .catch(err => res.status(404).json("Error" + err));
});

*/
module.exports = router;