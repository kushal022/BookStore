 //Import Models/Collections: 
 const books = require('../model/bookModel')
 const User = require('../model/userModel')

 //todo:----------------------------- Add Books Ctrl ----------------

 const addBooksCtrl = async (req,res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== 'admin'){
            return res.status(400).json({message: 'You cannot add books'})
        }
        const book = new books ({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        })
        await book.save();
        res.status(200).json({message: "Book added successfully"})
    } catch (error) {
        res.status(500).json({message: "Internal server error ", "Error": error})
    }
 }

  //todo:----------------------------- Update Books Ctrl ----------------

  const updateBooksCtrl = async (req,res)=>{
    try {
        const {id} = req.headers;

        if (!id) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const updatedBook = await books.findByIdAndUpdate (id,{
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        },{new: true});
        
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({message: "Book updated successfully"})

    } catch (error) {
        res.status(500).json({message: "Internal server error ", error})
        console.log(error)
    }
 }

  //todo:----------------------------- Delete Books Ctrl ----------------

  const deleteBooksCtrl = async (req,res)=>{
    try {
        const {id} = req.headers;
         if (!id) {
            return res.status(400).json({ message: "Book ID is required" });
        }
        
        await books.findByIdAndDelete(id);

        return res.status(200).json({message: "Book deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Internal server error ", "Error": error})
    }
 }

 //todo:----------------------------- Get Recent Books Ctrl ----------------

 const getRecentBooksCtrl = async (req,res)=>{
    try {
        const recentBooks = await books.find().sort({createdAt: -1 }).limit(4); // recent 4 books

        return res.status(200).json({
            status: "Success",
            data: recentBooks,
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error ", "Error": error})
    }
 }

 //todo:----------------------------- Get Books by id Ctrl ----------------

 const getBookByIdCtrl = async (req,res)=>{
    try {
        const {id} = req.params;
        const book = await books.findById(id)

        return res.status(200).json({
            status: "Success",
            data: book,
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error ", "Error": error})
    }
 }
 
 //todo:----------------------------- Get All Books Ctrl ----------------

 const getAllBooksCtrl = async (req,res)=>{
    try {
        const book = await books.find()

        return res.status(200).json({
            status: "Success",
            data: book,
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error ", "Error": error})
    }
 }

 module.exports = {addBooksCtrl, 
    updateBooksCtrl , 
    deleteBooksCtrl,
    getRecentBooksCtrl,
    getBookByIdCtrl,
    getAllBooksCtrl,}