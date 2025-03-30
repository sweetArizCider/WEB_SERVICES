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
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        secondlastname: {
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
        },
        token: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'token',
                key: 'id'
            }
        },
    },
    {
        sequelize: mysql.getSequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: false
    }
);
    
module.exports = User;