const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class Prestamos extends Model {}

Prestamos.init(
  {
    id_prestamos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    libro_isbn: {
      type: DataTypes.STRING(16),
      allowNull: false,
      references: {
        model: 'libro',
        key: 'isbn',
      },
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_devolucion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    entregado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: MySQL.getSequelize,
    timestamps: false,
    modelName: 'Prestamos',
    tableName: 'prestamos',
  }
);

module.exports = Prestamos;