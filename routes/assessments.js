//imports
const express = require('express');
const assessmentController = require('../controllers/assessments');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

//assessment routes

//INSERT data into assessment table = /assessments/assessment/userId
router.post('/assessment/:userId', isAuth, assessmentController.addAssessment);

//export
module.exports = router;