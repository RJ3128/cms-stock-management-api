const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token needed for authentication' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    return next();
};

module.exports = authMiddleware;