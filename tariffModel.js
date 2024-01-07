const { DataTypes } = require("sequelize");
const db = require("./connection");

const Tariff = db.define(
  "tariff",
  {
    region_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    tariff: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    period: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tariff_scheme_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    fixed_charge: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    base: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    intermediate: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    peak: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    distribution: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Tariff;