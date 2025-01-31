const express= require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get("/api/contacts",(req, res)=>{
    res.json({message:"get all contacts "});
})

app.listen(port, ()=>{
    console.log('server running on port ${PORT}');
});