const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Autor extends Model {}

Autor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        license: {
            type: DataTypes.STRING(12),
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        secondlastname: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        year: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
    },
    {
        sequelize: MySQL.getSequelize,
        timestamps: false,
        tableName: 'autor',
        modelName: 'Autor',
    }
);

module.exports = Autor;