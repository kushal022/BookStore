const express = require('express');
const router = express.Router();

const {authenticateToken} = require('./userAuth')

//import Controllers:
const {addBooksCtrl,
    updateBooksCtrl,
    deleteBooksCtrl,
    getRecentBooksCtrl,
    getBookByIdCtrl,
    getAllBooksCtrl,} = require('../controllers/booksCtrl')

//todo: --------------------- Add Books Route --------------------------
router.post('/addBook',authenticateToken, addBooksCtrl)                       
//todo: --------------------- Update Books Route --------------------------
router.put('/updateBook',authenticateToken, updateBooksCtrl)                       
//todo: --------------------- Delete Books Route --------------------------
router.delete('/deleteBook',authenticateToken, deleteBooksCtrl)                       
//todo: --------------------- Get Recent Books Route --------------------------
router.get('/getRecentBook', getRecentBooksCtrl)                       
//todo: --------------------- Get All Books Route --------------------------
router.get('/getAllBooks', getAllBooksCtrl)                       
//todo: --------------------- Get Books By Id Route --------------------------
router.get('/getBookById/:id', getBookByIdCtrl)                       


module.exports = router;