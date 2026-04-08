const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Carrera = sequelize.define(
	"Carrera",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
	},
	{
		tableName: "carreras",
		timestamps: false,
	},
);

module.exports = Carrera;
