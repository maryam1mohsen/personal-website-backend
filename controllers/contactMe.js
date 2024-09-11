const express = require('express');
const router = express.Router();
const ContactMe = require('../models/ContactMe');

// CREATE
router.post('/', async (req, res) => {
    try {
        const { name, email, inquiry } = req.body;
        const newContact = new ContactMe({ name, email, inquiry });
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const contacts = await ContactMe.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const contact = await ContactMe.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedContact = await ContactMe.findByIdAndDelete(req.params.id);
        if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(deletedContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
