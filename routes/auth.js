const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middlware/auth');
const { check, validationResult } = require('express-validator');

// Instance of our db, we can call function doing user.<method>
const User = require('../modules/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body

        try {

            // Getting a given user data searching by a given email.
            let user = await User.findOne({ email });

            // If no user was found.
            if (!user) {
                return res.status(400).json({ msg: 'Invalid credentials' })
            }

            // Comparing the plain text password with hashed password.
            const isMatch = await bcrypt.compare(password, user.password);

            // If they don't match, returning bad request.
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' })
            }

            // If match, creating the necessary payload to sign jwt token.
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
            console.error(err.message);
            return res.status(500).json({ msg: 'Server error' })
        }

});

module.exports = router;