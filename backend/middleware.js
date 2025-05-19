const jwt = require('jsonwebtoken');
import { JWT_SECRET } from './config';

const authMiddleware = (req, res , next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
             msg: "Added Bearer at the start while authorization"
        })
    }

    const token = authHeader.splits(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch(err){
        return res.status(403).json({
            msg: "error while authenticating"
        })
    }

};

module.exports = {
    authMiddleware
}