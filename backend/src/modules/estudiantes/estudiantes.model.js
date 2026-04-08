const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const Carrera = require("../carreras/carrera.model");

const Estudiante = sequelize.define(
	"Estudiante",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		apellido: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(120),
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		fecha_nacimiento: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		carrera_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "carreras",
				key: "id",
			},
		},
	},
	{
		tableName: "estudiantes",
		timestamps: false,
	},
);

Carrera.hasMany(Estudiante, { foreignKey: "carrera_id", as: "estudiantes" });
Estudiante.belongsTo(Carrera, { foreignKey: "carrera_id", as: "carrera" });

module.exports = Estudiante;
