const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Libro extends Model {}

Libro.init(
  {
    ISBN: {
      type: DataTypes.CHAR(13),
      allowNull: false,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    autorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'autor',  
        key: 'id',
      },
    },
    numPag: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    editorial: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize: MySQL.getSequelize,
    timestamps: false,            
    modelName: 'Libro',            
    tableName: 'libro', 
  }
);

module.exports = Libro;
