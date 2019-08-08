const User = require('../models/User');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//controller to register new users
exports.register = (req, res, next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error; 
        
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const user = req.body.user;
    const pass = req.body.pass;
    const emailAddress = req.body.emailAddress;
    const genderId = req.body.genderId;

    bcrypt.hash(pass, 12).then(hashedPw =>{
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            user: user,
            pass: hashedPw,
            genderId: genderId,
       });
       return newUser.save();
    })
    .then(result =>{
        res.status(201).json({message: 'User created!'});
    })
    .catch(err=>{
        if(!err.statusCode){
               err.statusCode = 500;
            }
            next(err);
    });   
};

//controller to login users  
exports.login = (req,res,next) =>{

    const user = req.body.user;
    const pass = req.body.pass;
    let loadedUser;
    User.findOne({
        where: {
            user: user
        }
        
    })
    .then(user =>{
        if(!user){
            const error = new Error('The username or password was incorrect');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(pass, user.pass);
    })
    .then(isEqual =>{
        if(!isEqual){
            const error = new Error('The username or password was incorrect');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({user: loadedUser.user, userId: loadedUser.id},
            'mysupersecretjsontoken', 
            {expiresIn: '2h'}
            );
            res.status(200).json({
                token: token, message: 'User logged in', 
                expiresIn: '7200', 
                userId: loadedUser.id, 
                });
            return;
    })
    .catch(err=>{
        if(!err.statusCode){
               err.statusCode = 500;
            }
            next(err);
            return err;
    }); 


};


//controller to update user information
exports.updateUser = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error; 
    }
    const userId = req.params.id
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const user = req.body.user;
    const emailAddress = req.body.emailAddress;
    const genderId = req.body.genderId;

  
        User.update({
            firstName: firstName,
            lastName: lastName,
            user: user,
            emailAddress: emailAddress,
            genderId: genderId
        },
        {where: {
            id: userId
        }
    })
    .then(result =>{
        res.status(201).json({message: 'Information updated!'});
    })
    .catch(err=>{
        if(!err.statusCode){
               err.statusCode = 500;
            }
            next(err);
    });   
};


//controller to change password
exports.changePass = ( req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error; 
    }
    const userId = req.params.id
    const pass = req.body.pass;

    bcrypt.hash(pass, 12).then(hashedPw =>{
        User.update({
            pass: hashedPw,

        },
       { where:{
            id: userId
        }}
        )


    })
    .then(result =>{
        res.status(201).json({message: 'Password changed!'});
    })
    .catch(err=>{
        if(!err.statusCode){
               err.statusCode = 500;
            }
            next(err);
    });    
}