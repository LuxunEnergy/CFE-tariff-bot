const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

// Force Decimal Types to be returned as Number instead of String
Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat;

const db = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  port: Number(process.env.DATABASE_PORT),
  host: process.env.DATABASE_HOST,
  logging: false,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;