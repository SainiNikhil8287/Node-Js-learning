const jwt = require('jsonwebtoken');


const jwtAuthMiddelware = (req, res, next)=>{

    // extract the jwt token form the request headers in postman or frontend

    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error : 'Unauthorize'});
    }

    try{
        // verify jwt token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }

    catch(err){
        console.error(err);
        res.status(401).json({ error : 'Invalid token'});
    }
}
////////////////////////////////////////////////////////////////////////

const generateToken = (userData) => {
    // generate new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30}); // 30 is seconds
}


module.exports = {jwtAuthMiddelware, generateToken}