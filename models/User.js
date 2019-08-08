const Sequelize = require('sequelize');

const db = require('../config/database');

const User = db.define('user', {

    id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName:{
        field: "first_name",
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName:{
        field: "last_name",
        type: Sequelize.STRING,
        allowNull: false
    },
    emailAddress:{
        field: "email_address",
        type: Sequelize.STRING,
        allowNull: false
    },
    user:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pass:{
        type: Sequelize.STRING,
        allowNull: false
    },
    userRoleId:{
        field: "user_role_id",
        type: Sequelize.INTEGER,
        default: 2
    },
    genderId:{
        field: "gender_id",
        type: Sequelize.INTEGER,
        allowNull: false,
     
    }
    
},
{
    timestamps: false
}

);

module.exports = User;