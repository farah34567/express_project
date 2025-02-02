const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { registerUser, currentUser, loginUser } = require('../controllers/userController');


// DEC Register a user
// route POST /api/users/register
// access public 
const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body;
    if (!username|| !email|| !password){
        res.status(400);
        throw new Error("All faileds are mandatory");
    }
    const userAvailable = await User.findOne({email});
   
    if(userAvailable){
        res.status(400);
        throw new Error ("User Already registered");
    };
    //Hash the Password
    
    res.json({message: "Register The User"});

});

// DEC Login a user
// route POST /api/users/register
// access public 
const loginUser = asyncHandler(async (req, res)=>{
    res.json({message: "Login The User"});
});

// DEC current a user info
// route GET /api/users/current
// access Private 
const currentUser = asyncHandler(async (req, res)=>{
    res.json({message: "Current The User"});
});

module.exports= {registerUser, loginUser, currentUser}

