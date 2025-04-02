const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// MDB
require('./config/db')
// Import Routes
const userRoutes = require('./routes/userRoute');
const booksRoutes = require('./routes/bookRoute') 

//middleware
app.use(express.json()) // tells the formate of data

app.get('/api', (req,res)=>{
    res.send('home page')
})

// user Routes:
app.use('/api/user',userRoutes)
// Books Routes:
app.use('/api/book',booksRoutes)
//Start Server
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}..`)
})