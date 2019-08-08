const Sequelize = require('sequelize');

const db = require('../config/database');

const Assessment = db.define('assessment', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId:{
        field: 'user_id',
        type: Sequelize.BIGINT,
        allowNull: false
    },
    startDate:{
        field: 'start_date',
        type: Sequelize.literal('DATETIME'),
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    userLevelId:{
        field: 'user_level_id',
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    statusId:{
        field: 'status_id',
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 1
    }
},
{
    timestamps: false
});

module.exports = Assessment;