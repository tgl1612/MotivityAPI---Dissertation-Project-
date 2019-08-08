const Sequelize = require('sequelize');

const db = require('../config/database');

const Exercise = db.define('exercise', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    videoPath:{
        field: 'video_path',
        type: Sequelize.STRING,
        allowNull: false
    },
    difficultyId:{
        field: 'difficulty_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bodyAreaId:{
        field: 'body_area_id',
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Exercise;