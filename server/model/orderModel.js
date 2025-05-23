const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: 'books',
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for delivery", "Delivered", "Canceled"],
    },

},{timestamps:true}) 

// Order Collection:

const order = mongoose.model('order', orderSchema);
module.exports = order;