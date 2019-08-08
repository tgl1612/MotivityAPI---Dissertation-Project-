const Assessment = require('../models/Assessment');
const Result = require('../models/Result');

exports.addAssessment =(req, res, next) =>{
    const userId = req.params.userId;
    let userLevel = 1;
    const q1 = req.body.q1;
    const q2 = req.body.q2;
    const q3 = req.body.q3;
    const q4 = req.body.q4;
    const q5 = req.body.q5;
    const q6 = req.body.q6;
    const q7 = req.body.q7;
    const q8 = req.body.q8;
    const q9 = req.body.q9;

    if (q1 === '1' || q2 ==='1' || q3 ==='1'|| q4 ==='1'|| q5 ==='1'|| q6 ==='1'|| q7 ==='1'|| q8 ==='1'|| q9 ==='1'){
        userLevel = 1;
    }
    else if (q1 === '3' && q2 ==='3' && q3 ==='3' && q4 ==='3' && q5 ==='3' && q6 ==='3' && q7 ==='3' && q8 ==='3' && q9==='3'){
        userLevel = 3;
    }else{
        userLevel = 2;
    }


    Assessment.create({
        userId: userId,
        userLevelId: userLevel,
     })
     .then(assessment =>{
            passedAssessmentId = assessment.id;
            Result.bulkCreate(
                [{
                assessmentId: passedAssessmentId,
                questionId: '1',
                userLevel: q1
            },{
                assessmentId: passedAssessmentId,
                questionId: '2',
                userLevel: q2
            },{
                assessmentId: passedAssessmentId,
                questionId: '3',
                userLevel: q3
            },{
                assessmentId: passedAssessmentId,
                questionId: '4',
                userLevel: q4
            },{
                assessmentId: passedAssessmentId,
                questionId: '5',
                userLevel: q5
            },{
                assessmentId: passedAssessmentId,
                questionId: '6',
                userLevel: q6
            },{
                assessmentId: passedAssessmentId,
                questionId: '7',
                userLevel: q7
            },{
                assessmentId: passedAssessmentId,
                questionId: '8',
                userLevel: q8
            },{
                assessmentId: passedAssessmentId,
                questionId: '9',
                userLevel: q9
            }]
            )
            .then(assessment=>{
                res.status(201).json({ message: 'Assessment and routine created!'});
            })
        })
        .catch(err=>{
            if(!err.statusCode){
                   err.statusCode = 500;
                }
                next(err);
        });   
};


