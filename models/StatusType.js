const Sequelize = require('sequelize');

const db = require('../config/database');

const StatusType = db.define('statusType', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    }

},
{
    tableName: 'mobility_levels'
}
);

module.exports = StatusType;