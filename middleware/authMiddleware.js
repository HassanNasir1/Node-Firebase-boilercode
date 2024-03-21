// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
        req.user = decodedToken; // Attach user data to the request object for further processing
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Token verification failed
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = authenticate;
