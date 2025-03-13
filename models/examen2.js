const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Examen2 extends Model {};

Examen2.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },// latitud real, longitud real, altitud real, nombre text, direccion varchar(128)
    latitud:{
        type: DataTypes.REAL,
        allowNull: false
    },
    longitud:{
        type: DataTypes.REAL,
        allowNull: false
    },
    altitud: {
        type: DataTypes.REAL,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(128),
        allowNull: false
    }
},
{
    sequelize: MySQL.getSequelize,
    timestamps: false,
    tableName: 'Examen2',
    modelName: 'Examen2'
});

module.exports = Examen2;
