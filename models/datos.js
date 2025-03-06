const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Datos extends Model {};

Datos.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    x:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    y: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    z: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    sequelize: MySQL.getSequelize,
    timestamps: false,
    tableName: 'datos',
    modelName: 'Datos'
});

module.exports = Datos;
