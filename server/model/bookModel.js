const mongoose = require('mongoose');

// Books Schema:
const booksSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
},{timestamps: true});

// Books Collection:

const books = mongoose.model('books', booksSchema);

module.exports = books;