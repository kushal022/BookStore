const express = require('express');
const router = express.Router();

const { authenticateToken } = require('./userAuth');

const {addBookToFavoriteCtrl,
    removeBookFromFavoriteCtrl,
    getFavoriteBooksCtrl,
} = require('../controllers/favoriteCtrl')

//todo------------------- Add Book to Favorite --------------------
router.put('/addBookToFavorite', authenticateToken, addBookToFavoriteCtrl)
//todo------------------- Remove Book From Favorite --------------------
router.put('/removeBookFromFavorite', authenticateToken, removeBookFromFavoriteCtrl)
//todo------------------- Get All Books From Favorite --------------------
router.get('/getAllBooksFromFavorite', authenticateToken, getFavoriteBooksCtrl)

module.exports = router;