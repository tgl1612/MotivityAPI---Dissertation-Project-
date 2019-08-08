const User = require('../models/User');
const Gender = require('../models/Gender');
const UserRole = require('../models/UserRole');
const Assessment = require('../models/Assessment');
const MobilityLevel = require('../models/MobilityLevel');
const sequelize = require('sequelize');

// controller to GET all users (except admin)
exports.getUsers = (req, res, next) =>{
    User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'user'],
          include : [
            {
              model: Assessment,
              required: false, 
              attributes: ['userLevelId'],
              limit: 1,
              order: [
                ['startDate', 'DESC']
              ]
            },
            { 
              model: Gender, 
              required: true,
              attributes: ['genderType']
              },
            {
               model: UserRole, 
              required: true,
              attributes: ['userType'],
              where:{
                  userType: 'user'
              }
            }
          ]
      }).then(users =>{
        
        res.status(200).json({users: users});
      })
      .catch(err=>{
        console.log(err);
      });
 };

//controller to count all users
exports.countUsers = (req, res, next) =>{
   User.findAll({
    attributes: [ [sequelize.fn('count', sequelize.col('id')), 'userCount']],
   })
  .then(userCount =>{
        
    res.status(200).json({userCount: userCount});
  })
  .catch(err=>{
    console.log(err);
  });
};

//controller to count all assessments
exports.countAssessments = (req, res, next) =>{
  Assessment.findAll({
         
    
    attributes: [ [sequelize.fn('count', sequelize.col('id')), 'assessmentCount']],
   })
  .then(assessmentCount =>{
        
    res.status(200).json({assessmentCount: assessmentCount});
  })
  .catch(err=>{
    console.log(err);
  });
};
//controller to count gender ratio
exports.countGenderRatio = (req, res, next) =>{
  User.findAll({
    include : [
      {
        model: Gender,
        required: true, 
        attributes: ['genderType'],
      }
      ],
    attributes: ['genderId', [sequelize.fn('count', sequelize.col('gender_id')), 'genderCount']],
    group: ['genderId']
   })
  .then(genderCount =>{
        
    res.status(200).json({genderCount: genderCount});
  })
  .catch(err=>{
    console.log(err);
  });
};

//controller to count top ten users / number of assessments completed by top ten users (individually) 
exports.TopUsers = (req, res, next) =>{
   Assessment.findAll({
    attributes:['userId', [sequelize.fn('count', sequelize.col('assessment.id')), 'assessmentCount']],
    group:['userId'],
    limit: 10,
    order:[
      [[sequelize.literal('assessmentCount'), 'DESC']]
    ],
    include:[{
      model: User, 
      required: false,
      attributes: ['user']
    }]
  })
  .then(assessmentCount =>{
        
    res.status(200).json({assessmentCount: assessmentCount});

  })
  .catch(err=>{
    console.log(err);
  });
};

