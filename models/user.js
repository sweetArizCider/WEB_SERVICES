const { Model, DataTypes } = require('sequelize');
const mysql = require('../utils/database');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(16),
            patern: new RegExp('^[a-zA-ZÑñ0-9_\.\!\$#%@]{6,16}$'),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        secondLastName: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize: mysql.getSequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: false
    }
);

    
module.exports = User;