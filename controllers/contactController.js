const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel"); // Ensure model name is capitalized

// Get all contacts (Private)
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user_id });
    res.status(200).json(contacts);
});

// Create contact (Private)
const createContact = asyncHandler(async (req, res) => {
    console.log("Request body:", req.body);
    const { name, age, phone, email } = req.body;
    if (!name || !age || !phone || !email) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        age,
        phone,
        email,
        user_id: req.user_id,
    });
    res.status(201).json(contact);
});

// Get a single contact (Private)
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// Update contact (Private)
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Fix permission check
    if (contact.user_id.toString() !== req.user_id) {
        res.status(403); // 403 Forbidden
        throw new Error("User doesn't have permission to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
});

// Delete contact (Private)
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Fix permission check
    if (contact.user_id.toString() !== req.user_id) {
        res.status(403); // 403 Forbidden
        throw new Error("User doesn't have permission to delete this contact");
    }

    await Contact.deleteOne({ _id: req.params.id }); // Correct deletion method
    res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
