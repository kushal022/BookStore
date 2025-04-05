// Import models:
const User = require('../model/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//todo: ------------------ Signup Ctrl ------------------------

const signUpCtrl = async(req,res) => {
    try {
        const { username, email, password, address} = req.body;

        //* Check username length is more than 3
        if (username.length < 4){
            return res.status(400).json({message: 'Username length should be greater than 3'})
        }

        //* Check username already exists ? 
        const existingUsername = await User.findOne({username: username});
        if (existingUsername){
            return res.status(400).json({message: 'Username already exists'})
        }

        //* Check email already exists ? 
        const existingEmail = await User.findOne({email: email});
        if (existingEmail){
            return res.status(400).json({message: 'Email already exists'})
        }

        //* Check password length:
        if (password.length <= 5){
            return res.status(400).json({message: "Password's length should be greater than 5"})
        }
        //* Hash Password:
        const hashedPassword = await bcrypt.hash(password, 10);

        //* Create new user:
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            address: address,
        });
        await newUser.save();
        return res.status(200).json({message: 'SignUp  Successfully'})
    } catch (error) {
        res.status(500).json({message:"Internal server error !!","error":error})
    }
}

//todo: ------------------ SignIn Ctrl ------------------------
const loginCtrl = async(req,res) => {
    try {
        const {username, password } = req.body;
        const existingUser = await User.findOne({username});
        if(!existingUser){
           return res.status(400).json({message: "Invalid credentials"})
        }

         // Compare passwords 1:

        // await bcrypt.compare(password,existingUser.password,(err,data)=>{
        //     if(data){
        //         return res.status(200).json({message: "SignIn Success"})
        //     }else{
        //        return res.status(400).json({message: "Invalid credentials"})
        //     }
        // });

         // Compare passwords 2: 
         const isMatch = await bcrypt.compare(password, existingUser.password); // true/false
         if (!isMatch) {
             return res.status(400).json({ message: "Invalid credentials" });
         }

         //jwt
         const authClaims = [
            {name: existingUser.username},
            {role: existingUser.role}
         ]
         const token = jwt.sign({authClaims},process.env.SECRET_KEY,{expiresIn:"30d"})
         // Successful login
         return res.status(200).json({ id: existingUser._id, role: existingUser.role,token: token, message:"LogIn Successfully" });

    } catch (error) {
        res.status(500).json({message: 'Internal server error',"error": error})
    }
}

//todo: ------------------ Get User Ctrl ------------------------

const getUserCtrl = async(req,res)=>{
    try {
        const  { id } = req.headers;
        const data = await User.findById(id).select("-password"); // without password
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: 'Internal server error',"error": error})
        
    }
}


//todo: ------------------ Update User address Ctrl ------------------------
const updateUserAddressCtrl = async(req,res)=>{
    try {
        const  { id } = req.headers;
        const { address} = req.body;
        await User.findByIdAndUpdate(id,{address: address});

        return res.status(200).json({message: 'Address updated successfully'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error',"error": error})
        
    }
}

module.exports = {signUpCtrl, loginCtrl,getUserCtrl, updateUserAddressCtrl}