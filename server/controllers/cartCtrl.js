const User = require('../model/userModel')
const Book = require('../model/bookModel')

//todo-------------------------- Add Book to Cart Controller -------------------------
const addBookInCartCtrl = async (req,res)=>{
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        
        const isBookInCart = userData.cart.includes(bookid);
        
        if(isBookInCart){
            return res.status(301).json({
                status:"Success",
                message:"Book is already in cart"
            });
        }

        await  User.findByIdAndUpdate(id,{$push:{cart:bookid}});

        return res.json({
            status:"Success",
            message: "Book added to cart"
        });

    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log(error)
    }
}

//todo-------------------------- Remove Book from Cart Controller -------------------------
const removeBookFromCartCtrl = async (req,res)=>{
    try {
        const {bookid} = req.params;
        const { id} = req.headers;
        
        await User.findByIdAndUpdate(id,{$pull:{cart: bookid}});
        
        return res.json({
            status:"Success",
            message: "Book removed from cart"
        });

    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log(error)
    }
}

//todo-------------------------- Get All Book from Cart Controller -------------------------
const getAllBooksFromCartCtrl = async (req,res)=>{
    try {
        const { id} = req.headers;
        
        const userData = await User.findById(id).populate("cart");
        const cartBooks = userData.cart.reverse(); // reverse the cart items
        
        return res.json({
            status:"Success",
            data: cartBooks
        });

    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log(error)
    }
}

module.exports = {addBookInCartCtrl,removeBookFromCartCtrl,getAllBooksFromCartCtrl}