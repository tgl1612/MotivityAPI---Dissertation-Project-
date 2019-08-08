const Sequelize = require('sequelize');

const db = require('../config/database');

const Gender = db.define('gender', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    genderType:{
        field: 'gender_type',
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = Gender;