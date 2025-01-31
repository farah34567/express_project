// DEC get all routes 
// route GET /api/contacts
// access public 
const getContacts= (req, res)=>{
    res.status(200).json({message:`get all contacts`});
}; 

// DEC create  all routes 
// route create /api/contacts
// access public 
const createContact= (req, res)=>{
    console.log("The request body is :",req.body);
    const {name, age, phone, email}=req.body;
    if(!name || !age|| !phone|| !email){
        res.status(404);
        throw new Error("All fields are mandatory");
        
    }
    res.status(200).json({message:`Create Contact`});
}

// DEC get  all routes 
// route get /api/contacts/:id
// access public 
const getContact= (req, res)=>{ 
    res.status(200).json({message:`Get Contacts for ${req.params.id}`});
}

// DEC create  all routes 
// route create /api/contacts/:id
// access public 
const updateContact= (req, res)=>{
    res.status(200).json({message:`Update  Contacts for ${req.params.id}`});
}

// DEC create  all routes 
// route create /api/contacts/:id
// access public 
const deleteContact= (req, res)=>{
    res.status(200).json({message:`Delete Contact for ${req.params.id}`});
}
module.exports= {getContacts, createContact, getContact,updateContact, deleteContact};