//imports
const express = require('express');
const userController = require('../controllers/admin');
const router = express.Router();
const isAuth = require('../middleware/isAuth');


//admin routes

//GET all users = /admin/users
router.get('/users', isAuth,  userController.getUsers);
//COUNT all users = /admin/countusers
router.get('/countusers', isAuth, userController.countUsers);
//COUNT all assessments = /admin/countassessments
router.get('/countassessments', isAuth, userController.countAssessments);
//COUNT gender ratio = /admin/genderratio
router.get('/genderratio', isAuth, userController.countGenderRatio);
//COUNT top users = /admin/topusers
router.get('/topusers', isAuth, userController.TopUsers);

//export
module.exports = router;
