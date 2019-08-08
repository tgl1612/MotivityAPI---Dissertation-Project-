//imports
const express = require('express');
const routineController = require('../controllers/routines');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

//routines routes

//get the pre-assessment routine = /routines/preroutine
router.get('/preroutine', isAuth, routineController.getPreRoutine);

//get all non-personalised cars routines = /routines/routines/:userId
router.get('/routines/:userId', isAuth, routineController.getRoutines);

//get single cars routine (or any exercise) = /routines/generalroutines/:exerciseId
router.get('/generalroutines/:exerciseId', isAuth, routineController.getCarsRoutine);

//GET all shown personalised routines = /routines/myroutines/:userId
router.get('/myroutines/:userId',isAuth, routineController.getMyRoutines);

// //GET single routine =/routines/routine/:assessmentId/
router.get('/routine/:assessmentId',isAuth, routineController.getRoutine);

//POST to change status of routine to hidden = /routines/hideroutine/:assessmentId
router.put('/hideroutine/:assessmentId',[], isAuth, routineController.updateRoutineStatus);

//route to COUNT all routines/assessments = /routines/countroutine/:userId/:assessmentId
router.get('/countroutine/:userId/:assessmentId', isAuth, routineController.countRoutines);

//export
module.exports = router;