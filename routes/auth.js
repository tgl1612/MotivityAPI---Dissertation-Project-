const express = require('express');
const {body} = require('express-validator/check');
const User = require ('../models/User');
const authController = require('../controllers/auth');
const router = express.Router();
const isAuth = require('../middleware/isAuth')

//auth routes

//route to POST user information (register user) - NEED TO GO OVER VALIDATION
router.post('/register', [

    body('firstName')
        .trim()
        .isLength({min: 3, max:16})
        .withMessage('First name must be between 3 - 16 characters.')
        .escape()
    ,
    body('lastName')
        .trim()
        .isLength({min: 3, max:16})
        .withMessage('Last name must be between 3 - 16 characters.')

        .escape()
    ,
    body('emailAddress')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, {req} ) =>{
            return User.findOne(
                {where: {emailAddress: value}})
                .then(userDoc =>{
                if(userDoc){
                    return Promise.reject('Email address already exists! Try signing in if you already have an account')
                }
            });
        })
        .normalizeEmail(),
    body('user')
        .trim()
        .isLength({min:6, max: 16})
        .withMessage('Username must be between 6-16 characters')
        .custom((value, {req}) =>{
            return User.findOne(
                {
                    where:{user: value}
               })
                .then(userDoc =>{
                if(userDoc){
                    return Promise.reject('Username already exists! Please choose another.')
                }
            })
        })
        .escape(),

    body('pass')
        .trim()
        .isLength({min: 8, max: 20})
        .withMessage('Password must be between 8-20 characters'),
   
        body('confirmPass')
            .trim()
            .custom((value, {req}) =>{
                if(value !== req.body.pass){
                    throw new Error('Passwords have to match');
                }else{
                    return true;
                }
            })
    
        
],
authController.register);

//route to POST user login details (log in)
router.post('/login', authController.login);


//route to UPDATE user info 
router.put('/update/:id', [

    body('firstName')
        .trim()
        .isLength({min: 3, max:20})
        .withMessage('First name must be between 3 - 20 characters.')
        .escape()
    ,
    body('lastName')
        .trim()
        .isLength({min: 3, max:20})
        .withMessage('Last name must be between 3 - 20 characters.')

        .escape()
    ,
    body('emailAddress')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, {req} ) =>{
            return User.findOne(
                {where: {emailAddress: value}})
                .then(userDoc =>{
                if(userDoc && userDoc.id != req.params.id){
                    return Promise.reject('Email address already exists! Try signing in if you already have an account')
                }
            });
        })
        .normalizeEmail(),
    body('user')
        .trim()
        .isLength({min:6, max: 20})
        .withMessage('Username must be between 6-20 characters')
        .custom((value, {req}) =>{
            return User.findOne(
                {
                    where:
                    {user: value},
               })
                .then(userDoc =>{
                if(userDoc && userDoc.id != req.params.id){
                    return Promise.reject('Username already exists! Please choose another.')
                }
            })
        })
        .escape(),

], isAuth, authController.updateUser);

//router to change password
router.put('/changepass/:id', [
body('pass')
.trim()
.isLength({min: 8, max: 20})
.withMessage('Password must be between 6-20 characters'),

body('confirmPass')
    .trim()
    .custom((value, {req}) =>{
        if(value !== req.body.pass){
            throw new Error('Passwords have to match');
        }else{
            return true;
        }
    })
], isAuth, authController.changePass)

module.exports = router;
