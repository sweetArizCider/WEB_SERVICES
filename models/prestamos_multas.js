const { DataTypes, Model } = require('sequelize');
const MySQL = require('../utils/database');

class PrestamosMultas extends Model {}

PrestamosMultas.init(
  {
    id_prestamos_multas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_prestamos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'prestamos',
        key: 'id_prestamos',
      },
    },
    fecha_multa: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    multa: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    pagado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: MySQL.getSequelize,
    timestamps: false,
    modelName: 'PrestamosMultas',
    tableName: 'prestamos_multas',
  }
);

module.exports = PrestamosMultas;