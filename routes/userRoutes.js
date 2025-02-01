const express = require('express');

const router = express.Router();
router.post('/register', (req, res)=>{
    res.json({message: "Register The User"})

});
router.post('/login', (req, res)=>{
    res.json({message: "login The User"})

});
router.post('/current', (req, res)=>{
    res.json({message: "current  The User information"})

})
module.exports= router;