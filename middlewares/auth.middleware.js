const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: 'Token needed for authentication' });

    try {

    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }


};