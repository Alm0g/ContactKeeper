const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, auth denied' });
    }

    try {
        // Verifying that the token is legit.
        // Inputting the received token with the secret in order to parse it.
        // Returns the decoded jwt token.
        const decoded = jwt.verify(token, config.get('jwtSecert'));

        // Assigning req.user to the decoded.user that reflects user details from db. 
        req.user = decoded.user;
        next();

    } catch (err) {
        req.status(401).json({ msg: 'Token is not valid' });
    }

}