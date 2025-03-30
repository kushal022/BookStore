const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// MDB
require('./config/db')
// Import Routes
const userRoute = require('./routes/userRoute');

//middleware
app.use(express.json()) // tells the formate of data

app.get('/api', (req,res)=>{
    res.send('home page')
})

// use Routes:
app.use('/api/user',userRoute)
//Start Server
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}..`)
})