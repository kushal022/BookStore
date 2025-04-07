const express = require('express');
const router = express.Router();

const {authenticateToken} = require('./userAuth')

const {placeOrderCtrl,
    orderHistoryCtrl,
    getAllOrdersCtrl,
    updateOrderStatusCtrl,
} = require('../controllers/orderCtrl')

//todo: --------------------- Place Order Route --------------------------
router.post('/placeOrder', authenticateToken, placeOrderCtrl);
//todo: --------------------- Order History Route --------------------------
router.get('/orderHistory', authenticateToken, orderHistoryCtrl);
//todo: --------------------- Get All Order Route --------------------------
router.get('/getAllOrders', authenticateToken, getAllOrdersCtrl);
//todo: --------------------- Update Order Status Route --------------------------
router.put('/updateOrderStatus/:id', authenticateToken, updateOrderStatusCtrl);



module.exports = router;