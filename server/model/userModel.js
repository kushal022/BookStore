const mongoose = require('mongoose');

// User Schema:
const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
    },
    address:{
        type: String,

    },
    img:{
        type:String,
        default: 'https://static.vecteezy.com/system/resources/previews/017/173/365/original/medical-avatar-flat-icons-elements-png.png',

    },
    role: {
        type: String,
        default: 'user',
        enum:['user','admin'],
    },
    favorites:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'books',
        }
    ],
    cart:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'books',
        }
    ],
    orders:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'order',
        }
    ]


},{timestamps:true});

// User Collection
const User = mongoose.model('User',userSchema)
module.exports = User;