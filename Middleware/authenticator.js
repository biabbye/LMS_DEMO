const jwt = require('jsonwebtoken');
const {jwtSecret}  = require('../config/dev');

exports.authenticateJWT = (req,res,next) => {
    const token = req.cookies.token;
    
    if(!token) {
        return res.status(401).json({
            errorMessage: 'No token. Authorization denied.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {ignoreExpiration: true});

        req.user = decoded.user;

        next();
    } catch (error) {
        console.log('jwt error: ', error);
        res.status(401).json({
            errorMessage: 'Invalid token'
        });
    }
};