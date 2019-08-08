const Sequelize = require('sequelize');

const db = require('../config/database');

const Question = db.define('question', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    question:{
        type: Sequelize.STRING,
        allowNull: false
    },
    bodyAreaId:{
        field: 'body_area_id',
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Question;