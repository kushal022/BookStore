const express = require('express');
const router = express.Router();

const { authenticateToken } = require('./userAuth');

const {addBookToFavoriteCtrl,
    removeBookFromFavoriteCtrl,
} = require('../controllers/favoriteCtrl')

//todo------------------- Add Book to Favorite --------------------
router.put('/addBookToFavorite', authenticateToken, addBookToFavoriteCtrl)
//todo------------------- Remove Book From Favorite --------------------
router.delete('/removeBookFromFavorite', authenticateToken, removeBookFromFavoriteCtrl)

module.exports = router;