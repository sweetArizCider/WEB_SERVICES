const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Ordenes extends Model {}

Ordenes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        approvallink: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        orderid: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

    },
    {
        sequelize: MySQL.getSequelize,
        timestamps: false,
        tableName: 'ordenes',
        modelName: 'Ordenes',
    }
);

module.exports = Ordenes;