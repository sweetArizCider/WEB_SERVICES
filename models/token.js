const { DataTypes , Model } = require('sequelize');
const MySQL = require('../utils/database');

class Token extends Model {};

Token.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token:{
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        used:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        expiration:{
            type: DataTypes.DATE,
            allowNull: false,
        }
    }
    ,{
        sequelize: MySQL.getSequelize,
        timestamps: false,
        modelName: 'Token',
        tableName: 'token'
    }
)

module.exports = Token;