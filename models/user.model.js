const mongoose = require("mongoose");
const song = require("./song.model")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    firstName:{
        type: String,
        trim:true
    },
    lastName:{
        type: String,
        trim:true
    },
    songs: [{ type : mongoose.Types.ObjectId, ref: "Song" }]
    
    //Add here more info in the schema
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema);

module.exports = User; 