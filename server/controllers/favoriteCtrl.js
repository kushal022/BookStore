const User = require('../model/userModel')
const Book = require('../model/bookModel')

//todo-------------------------- Add Book to Favorites Controller -------------------------
const addBookToFavoriteCtrl = async(req , res )=>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);

        const isBookFavorite = userData.favorites.includes(bookid)
        if(isBookFavorite){
            return res.status(400).json({message: "Book is already in favorites"})
        }

        await User.findByIdAndUpdate(id, {$push:{favorites: bookid}})
        return res.status(200).json({message: "Book added in favorites"})
    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log(error)
    }
}

//todo-------------------------- Remove Book from Favorites Controller -------------------------
const removeBookFromFavoriteCtrl = async (req, res)=>{
    try {
        const {bookid, id } = req.headers;
        const userData = await User.findById(id);

        const isBookFavorite = userData.favorites.includes(bookid);
        if(isBookFavorite){
            await User.findByIdAndUpdate(id, {$pull:{favorites: bookid}})  // pull for delete item from db
            return res.status(200).json({message: "Book has removed from favorites"})
        }else{
            return res.status(400).json({message: "Book is not found in favorites"})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log(error)
    }
}

//todo-------------------------- Get All Books from Favorites Controller -------------------------
const getFavoriteBooksCtrl = async (req, res)=>{
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favorites");
        const favoriteBooks = userData.favorites

        return res.status(200).json({
            status: "Success",
            data: favoriteBooks,
        })

    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log(error)
    }
}
module.exports = {addBookToFavoriteCtrl,removeBookFromFavoriteCtrl,getFavoriteBooksCtrl}