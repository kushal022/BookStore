const express = require('express');
const router = express.Router();

const {authenticateToken} = require('./userAuth')

const {addBookInCartCtrl,
    removeBookFromCartCtrl,
    getAllBooksFromCartCtrl,
} = require('../controllers/cartCtrl')

//todo: --------------------- Add Books in Cart Route --------------------------
router.put('/addBookInCart', authenticateToken, addBookInCartCtrl);
//todo: --------------------- Remove Books from Cart Route --------------------------
router.put('/removeBookFromCart/:bookid', authenticateToken, removeBookFromCartCtrl);
//todo: --------------------- Get All Books from Cart Route --------------------------
router.get('/getAllBooksFromCart', authenticateToken, getAllBooksFromCartCtrl);



module.exports = router;