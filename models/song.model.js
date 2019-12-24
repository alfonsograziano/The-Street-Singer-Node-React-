const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    song:{
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
})

const Song = mongoose.model("Song", songSchema);

module.exports = Song; 
