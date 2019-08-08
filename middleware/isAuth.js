const jwt = require('jsonwebtoken');

//middleware to check that user has access token to view resources
module.exports = (req, res, next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated.')
        error.StatusCode = 401;
        throw error;
    }
    const token =  authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.JSON_TOKEN);

    }
    catch(err){
        err.StatusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not authenticated.');
        error.StatusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();

};