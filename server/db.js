require("dotenv").config();

// import and destructure Sequelize class from the import
const { Sequelize, DataTypes } = require("sequelize");

// console.log(process.env.DB_URL);
// console.log(process.env.PORT);
// instantiate sequelize and provide it with location and credentials
const db = new Sequelize(process.env.DB_URL, {
	logging: true
})

// export for use in other areas of the project
module.exports = { db, Sequelize, DataTypes }

// Ensure db actually exists