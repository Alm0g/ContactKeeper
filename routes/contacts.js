const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlware/auth');
const Contact = require('../modules/Contact');
const User = require('../modules/User');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json(contacts);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [  auth, [
    check('name', 'Name id required').not().isEmpty()
] ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const { name, email, phone, type } = req.body 

    try {
        const newContact = new Contact({
            name, 
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
    
    const { name, email, phone, type } = req.body 

    // Build contact object
    const contactField = {};
    if (name) contactField.name = name;
    if (email) contactField.email = email;
    if (phone) contactField.phone = phone;
    if (type) contactField.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        
        if (!contact) return res.status(404).json({ msg: 'Contact not found' })
        
        // Make sure user owns the contact he wants to update
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        };

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactField },
            { new: true ,
             useFindAndModify: false }
        );

        console.log("This is contact value: ", contact)
        res.json(contact);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

});

// @route   PUT api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {

    try {
        let contact = await Contact.findById(req.params.id);
        
        if (!contact) return res.status(404).json({ msg: 'Contact not found' })
        
        // Make sure user owns the contact he wants to delete
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        };

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact removed' });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }


});

module.exports = router;