const asyncHandler= require("express-async-handler");
const contact= require("../models/contactModel");

// DEC get all routes 
// route GET /api/contacts
// access public 
const getContacts=asyncHandler(async (req, res)=>{
    const contacts = await Contact.find();
    res.status(200).json({contacts});
}); 

// DEC create  all routes 
// route create /api/contacts
// access public 
const createContact=asyncHandler(async(req, res)=>{
    console.log("The request body is :",req.body);
    const {name, age, phone, email} = req.body;
    if(!name || !age|| !phone|| !email){
        res.status(404);
        throw new Error("All fields are mandatory");
        
    }
    const contact = await Contact.create({
        name, 
        age, 
        phone, 
        email,
    });
    res.status(201).json(contact);
});

// DEC get  all routes 
// route get /api/contacts/:id
// access public 
const getContact= asyncHandler(async(req, res)=>{ 
    const contact = await Contact.findById(req.params.id);
    res.status(200).json(contact);
});

// DEC update   routes by id
// route create /api/contacts/:id
// access public 
const updateContact= asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("contact not found");
    };
    const updateContact = await Contact.updateById(req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateContact);
});

// DEC delete  routes by id 
// route delete /api/contacts/:id
// access public 
const deleteContact= asyncHandler(async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    await contact.remove();
    res.status(200).json(contact);
})
module.exports= {getContacts, createContact, getContact,updateContact, deleteContact};