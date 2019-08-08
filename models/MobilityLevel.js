const Sequelize = require('sequelize');

const db = require('../config/database');

const MobilityLevel = db.define('mobilityLevel', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    level:{
        type: Sequelize.STRING,
        allowNull: false
    },
},
{
    tableName: 'mobility_levels'
}

);

module.exports = MobilityLevel;