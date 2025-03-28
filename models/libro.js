const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Libro extends Model {}

Libro.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      autoIncrement: true
    },
    isbn: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
    },
    img:{
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    autor_license: {
      type: DataTypes.STRING(12),
      allowNull: true,
      references: {
        model: 'autor',
        key: 'license',
      },
    },
    editorial: {
      type: DataTypes.TEXT('tiny'),
      allowNull: true,
    },
    pages: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    year: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    genre: {
      type: DataTypes.TEXT('tiny'),
      allowNull: true,
    },
    language: {
      type: DataTypes.TEXT('tiny'),
      allowNull: false,
    },
    format: {
      type: DataTypes.TEXT('tiny'),
      allowNull: true,
    },
    sinopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    sequelize: MySQL.getSequelize,
    timestamps: false,
    modelName: 'Libro',
    tableName: 'libro',
  }
);

module.exports = Libro;