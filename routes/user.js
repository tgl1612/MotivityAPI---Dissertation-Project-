//imports
const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const isAuth = require('../middleware/isAuth');


//user routes 

//GET single user =/user/userId 
router.get('/:userId', isAuth, userController.getUser);

//DELETE single user = /user/delete/userId
router.delete('/delete/:userId', isAuth, userController.deleteUser);

//GET COUNT of assessments a user has completed = /user/userId/assessments
router.get('/:userId/assessments', isAuth, userController.getTotalAssessments);

//get an individual user's result for an assessment = /user/result/:assessmentId
router.get('/result/:assessmentId', isAuth, userController.getUserResult);

//export
module.exports = router;