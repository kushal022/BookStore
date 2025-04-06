const User = require('../model/userModel')
const Book = require('../model/bookModel')
const Order = require('../model/orderModel')

//todo-------------------------- Place Order Controller -------------------------
const placeOrderCtrl = async (req,res)=>{
    try {
        const {id} = req.headers;
        const {order} = req.body; // Order from cart

        for(const orderData of order){
            const newOrder = new Order({user:id,book:orderData._id});
            const orderDataFromDb = await newOrder.save(); // history
            //saving order in user model:
            await User.findByIdAndUpdate(id,{$push:{orders:orderDataFromDb}});
            //clearing Cart:
            await User.findByIdAndUpdate(id,{$pull:{cart:orderData._id}});
        }

        return res.status(200).json({
            status: "Success",
            message: "Order Placed Successfully"
        })

    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log(error)
    }
}

//todo-------------------------- Order History Controller: for User -------------------------
const orderHistoryCtrl = async (req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "order",
            populate: {path: 'books'},
        });

        const ordersData = userData.orders.reverse();

        return res.json({
            status: "Success",
            data: ordersData,
        })

    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log(error)
    }
}

//todo-------------------------- Get All Orders Controller : For Admin Only -------------------------
const getAllOrdersCtrl = async (req,res)=>{
    try {
        const userData = await Order.find()
        .populate({
            path: "books",
        })
        .populate({
            path: "user",
        })
        .sort({createdAt: -1});

        return res.json({
            status: "Success",
            data: userData
        })

    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log(error)
    }
}

//todo-------------------------- Update Order Status Controller : For Admin Only -------------------------
const updateOrderStatusCtrl = async (req,res)=>{
    try {
        const {id} = req.params; // order id
        await Order.findByIdAndUpdate(id,{status: req.body.status})

        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
        })

    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log(error)
    }
}

module.exports = {placeOrderCtrl,orderHistoryCtrl,getAllOrdersCtrl,updateOrderStatusCtrl}