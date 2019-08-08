const Sequelize = require('sequelize');

const db = require('../config/database');

const UserRole  = db.define('userRole', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userType:{
        field: 'user_type',
        type: Sequelize.STRING,
        allowNull: false
    }


},
{

tableName: 'user_roles'

}

);

module.exports = UserRole;