const mongoose = require('mongoose');

//Connect to MongoDB:
const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected..');        
    } catch (error) {
        console.log("MongoDB not connected !!-->", error)
    }
}

connectDb();