const User = require('../models/User');
const Gender = require('../models/Gender');
const Assessment = require('../models/Assessment');
const Result = require('../models/Result');
const MobilityLevel = require('../models/MobilityLevel');


//controller to GET a single user + current user level
exports.getUser = (req, res, next)=>{
    const userId = req.params.userId;
    User.findByPk(userId,
      {
      attributes: ['id', 'firstName', 'lastName', 'emailAddress', 'user', 'genderId'],
      include : [
        { 
          model: Gender, 
          required: true,
          attributes: ['genderType']
          },
        {
          model: Assessment,
          required: true,
          attributes: [['id', 'AssessmentId'], 'startDate', 'userLevelId'],
          limit: 1,
          order: [
            ['startDate', 'DESC']
          ]
        }
      ]
      }
      )
    .then(user =>{
      res.status(200).json({user:user});
    })
    .catch(err=>{
      console.log(err);
    });
};

//controller to get user's stats for an assessment 
exports.getUserResult = (req, res, next) =>{
  const assessmentId = req.params.assessmentId;
  Result.findAll({
    where:{
      assessmentId: assessmentId
    },
    include: [
      {
         model: MobilityLevel,
         
         attributes:['level']
      },
      {
        model:Assessment,
        attributes:['userLevelId']
      }
   ]
  }
    

)
  .then(result =>{
    res.status(200).json({result: result});
  })
  .catch(err=>{
    console.log(err);
  });
};


//controller to GET the count of assessments a user has done - move to user controller.
exports.getTotalAssessments = (req, res, next)=>{
  const userId = req.params.userId;
  Assessment.count({
    
    where: {
      userId: userId
    }
  })
  .then(count =>{
    res.status(200).json({count:count});
  })
  .catch(err=>{
    console.log(err);
  })
}


//controller to DELETE a single user - DO i need to return a message?
exports.deleteUser = (req, res, next)=>{
  const userId = req.params.userId;
  User.findByPk(userId)
  .then(user =>{
    return user.destroy();
  })
  .then(result =>{
    res.status(200).json({Message: 'User successfully deleted'});

    console.log('User deleted');
  })
  .catch(err=>{
    console.log(err);
  })
};


