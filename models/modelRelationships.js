
exports.modelRelationships = () =>{

//establish model relationships
//import models
const Assessment = require('./Assessment');
const BodyArea = require('./BodyArea');
const Exercise = require('./Exercise');
const Gender = require('./Gender');
const MobilityLevel = require('./MobilityLevel');
const Question = require('./Question');
const Result = require('./Result');
const StatusType = require('./StatusType');
const User = require('./User');
const UserRole = require('./UserRole');

//gender/user relationship
Gender.hasMany(User, {foreignKey: 'genderId', sourceKey: 'id'});
User.belongsTo(Gender, {foreignKey: 'genderId', targetKey: 'id'});

//userRole/user relationship
UserRole.hasMany(User, {foreignKey: 'userRoleId', sourceKey: 'id'});
User.belongsTo(UserRole, {foreignKey: 'userRoleId', targetKey: 'id'});

//user/assessment relationship 
User.hasMany(Assessment, {foreignKey: 'userId', sourceKey: 'id'});
Assessment.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

//mobilityLevel/assessment relationship
MobilityLevel.hasMany(Assessment, {foreignKey: 'userLevelId', sourceKey: 'id'});
Assessment.belongsTo(MobilityLevel, {foreignKey: 'userLevelId', targetKey: 'id'});

//assessment/result relationship
Assessment.hasMany(Result, {foreignKey: 'assessmentId', sourceKey: 'id'});
Result.belongsTo(Assessment, {foreignKey: 'assessmentId', targetKey: 'id'});

//question/result relationship
Question.hasMany(Result, {foreignKey: 'questionId', sourceKey: 'id'});
Result.belongsTo(Question, {foreignKey: 'questionId', targetKey: 'id'});

//mobilityLevel/result relationship 
MobilityLevel.hasMany(Result, {foreignKey: 'userLevel', sourceKey: 'id'});
Result.belongsTo(MobilityLevel, {foreignKey: 'userLevel', targetKey: 'id'});

//question/bodyArea relationship
Question.hasMany(BodyArea, {foreignKey: 'bodyAreaId', sourceKey: 'id'});
BodyArea.belongsTo(Question, {foreignKey: 'id', targetKey: 'bodyAreaId'});

//bodyArea/exercise relationship - THESE NEED TESTED
BodyArea.hasMany(Exercise, {foreignKey: 'bodyAreaId', sourceKey: 'id'});
Exercise.belongsTo(BodyArea, {foreignKey: 'bodyAreaId', targetKey: 'id'});

//mobilityLevel/exercise relationship - THESE NEED TESTED
MobilityLevel.hasMany(Exercise, {foreignKey: 'difficultyId', sourceKey: 'id'});
Exercise.belongsTo(MobilityLevel, {foreignKey: 'difficultyId', targetKey: 'id'});

//status/assessment relationship 
StatusType.hasMany(Assessment, {foreignKey: 'statusId', sourceKey: 'id'});
Assessment.belongsTo(StatusType, {foreignKey: 'statusId', targetKey: 'id'});

};