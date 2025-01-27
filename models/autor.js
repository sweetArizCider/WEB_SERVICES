const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database')
class Autor extends Model {}

Autor.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidoPaterno:{
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidoMaterno:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: MySQL.getSequelize,
        timestamps: false,
        tableName: 'autor',
        modelName: 'Autor'
    }
);

module.exports = Autor

