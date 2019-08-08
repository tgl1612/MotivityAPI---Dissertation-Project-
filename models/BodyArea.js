const Sequelize = require('sequelize');

const db = require('../config/database');

const BodyArea = db.define('bodyArea', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bodyPart:{
        field: 'body_part',
        type: Sequelize.STRING,
        allowNull: false
    },
},
{
    tableName: 'body_areas'
}

);

module.exports = BodyArea;