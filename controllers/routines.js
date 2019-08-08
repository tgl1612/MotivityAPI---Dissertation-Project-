const Assessment = require('../models/Assessment');
const Result = require('../models/Result');
const Question = require('../models/Question');
const BodyArea = require('../models/BodyArea');
const Exercise = require('../models/Exercise');
const Sequelize = require('sequelize');
const MobilityLevel = require('../models/MobilityLevel');
const Op = Sequelize.Op

//controller to get pre-assessment routine
exports.getPreRoutine = (req, res, next) =>{
    Exercise.findOne({
        attributes:['id','name', 'description', 'videoPath', 'difficultyId'],
        where:{
            id: 1
          
        }
    })
    .then(preRoutine=>{
        res.status(200).json({preRoutine: preRoutine});

    })
    .catch(err=>{
        console.log(err);
    })

};

//controller to get cars routines 
exports.getRoutines =(req, res, next) =>{
    const userId = req.params.userId;

    Assessment.findAll({
        raw: true,
        attributes: ['userLevelId'],
        where: { 
            userId: userId
        },
        order: [
            ['startDate', 'DESC']
        ],
        limit: 1
    })
    .then(userLevel =>{
        return userLevel[0].userLevelId;
        })
        .then(userLevel =>{
            const userLevelData = userLevel;
        Exercise.findAll({
            attributes:['id','name', 'description', 'videoPath', 'difficultyId'],
            where: {
                id:{
                    [Op.and]: {
                        [Op.gt]: 1,
                        [Op.lt]: 5
                    }
                    
                }, 
                difficultyId:{
                    [Op.lte]: userLevelData
                } 
            },
            include:[{
                model: MobilityLevel,
                attributes:[],
                required: true,
            }] 
        })
        .then(cars =>{
           res.status(200).json({cars: cars});
 
        })
        .catch(err=>{
            console.log(err);
        });
    })
}

//controller to get cars individual routine (technically all exercises)
exports.getCarsRoutine = (req,res,next) =>{
    const exerciseId = req.params.exerciseId;

    Exercise.findByPk(exerciseId)
    .then(exercise =>{
        res.status(200).json({exercise: exercise});
      })
      .catch(err=>{
        console.log(err);
      });
 
}



//controller to get all personalised shown routines - (assessments) - includes rank for naming routines. 
exports.getMyRoutines = (req, res, next) =>{
    const userId = req.params.userId;

    Assessment.findAll(
       
        {
           
            attributes: [ 'id', 'userId', 'startDate', 'userLevelId',
                [Sequelize.literal('(RANK() OVER (ORDER BY start_date ASC))'), 'rank']
            ],
            where: {
                [Op.and]:{
                userId: userId,
                statusId: 1
                }
            },
            rank: {
                order: [
                    ['startDate', 'DESC']
                ]
            },
            order:[
                ['startDate', 'DESC']
            ]
        }
    )
    .then(assessment =>{
        res.status(200).json({assessment: assessment});
      })
      .catch(err=>{
        console.log(err);
      })
    
};

//controller to GET individual user routine 
//changed on 27/6 to include count function and if/else statement in second promise

exports.getRoutine = (req, res, next) =>{
    const assessmentId = req.params.assessmentId;

    Assessment.count({
        where:{
            id:assessmentId
        }}
    )
    .then(count=>{
        if(count === 0){
            
            return [{userLevelId: 1}]

           
        }else{
            const result = Assessment.findAll(
                {
                attributes: ['userLevelId'],
                where:{
                    id: assessmentId
                }
                })
                return result;
        }
})
   
    
    .then(userLevel =>{
        return userLevel[0].userLevelId;
        })
        .then(userLevel =>{
            const userLevelData = userLevel;
            Exercise.findAll(
                {
                attributes: ['name', 'description','videoPath'],
                where: {
                
                    difficultyId: userLevelData
                },
                    include:[
                    {
                        model: BodyArea,
                        required: true,
                        attributes: [],
                        include: [{
                            model: Question, 
                            required: true,
                            attributes: [],
                            include: [{
                                model: Result,
                                required: true,
                                attributes:[],
                                where:{
                                    userLevel: userLevelData
                                },
                                include: [{
                                    model: Assessment,
                                    required: true,
                                    attributes: [],
                                    where: {
                                        id: assessmentId,
                                    }
                                }]
                            }]
                        }]
                    } 
                ],
            })
            .then(routine =>{
                res.status(200).json({routine: routine});
            })
            .catch(err=>{
                console.log(err);
            });
});    
  
}

//controller to UPDATE routine status to hidden ( for user its like delete but admin can still see stats.)
exports.updateRoutineStatus = (req, res, next) =>{
    const assessmentId = req.params.assessmentId;
    Assessment.update({
        statusId: 2,

        
    },
    {where: {
        id: assessmentId,
    }
})


.then(response=>{
    res.status(200).json({message: 'Routine deleted'});
})
.catch(err=>{
    console.log(err);
})

}

//controller to count routines for security check
exports.countRoutines =(req,res, next) =>{

    const assessmentId = req.params.assessmentId;
    const userId = req.params.userId;
    Assessment.count({
        where:{
            userId: userId,

            [Sequelize.Op.and]: {

                id:assessmentId}
        }}
    )
    .then(count=>{
        res.status(200).json({count: count});
    })
    .catch(err=>{
        console.log(err);
    })

};