const Sequelize = require('sequelize');

const db = require('../config/database');

const Result = db.define('result', {

    assessmentId:{
        field: 'assessment_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    questionId:{
        field: 'question_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userLevel:{
        field: 'user_level',
        type: Sequelize.INTEGER,
        allowNull: false
    }
        
},
{
    timestamps: false
});

Result.removeAttribute('id');

module.exports = Result;