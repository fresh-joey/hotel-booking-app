const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.MYSQL_HOST || "mysql",
  port: process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "yourpassword",
  database: process.env.MYSQL_DATABASE || "review_service",
  logging: false,
});

module.exports = sequelize;
