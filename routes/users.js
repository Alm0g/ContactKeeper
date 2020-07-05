const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../modules/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
    '/', [
        check('name', 'Please add name').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
        ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 

        // Destrucctering the request.
        const { name, email, password } = req.body;

        try {

            // Checking that the email have not used yet.
            let user = await User.findOne({ email });

            // If exists, sending a bad request.
            if (user) {
                return res.status(400).json({ msg: 'User already exists' })
            }

            // Creating a new user module (db) object with received payload.
            user = new User({
                name, 
                email, 
                password
            });

            // Creating a random salt, ten rounds of generation.
            const salt = await bcrypt.genSalt(10);

            // Hashing the password with a given salt.
            user.password = await bcrypt.hash(password, salt);

            // Saving user to DB under user module.
            await user.save();

            // Creating the necessary payload to sign jwt token.
            const payload = {
                user: {
                    id: user.id
                }
            }

            // Signing a jwt token, if succedded, sending it as a respone.
            jwt.sign(
                payload,
                config.get('jwtSecert'),
                {expiresIn: 360000}, 
                (err, token) => {
                if (err) throw err;
                res.json({ token });
                } 
            );

        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Server Error');
        }
});

module.exports = router;