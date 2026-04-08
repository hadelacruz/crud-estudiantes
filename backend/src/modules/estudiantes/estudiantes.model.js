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
				isEmail: {
					msg: "El email no tiene un formato válido.",
				},
			},
		},
		fecha_nacimiento: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			validate: {
				isNotFutureDate(value) {
					if (!value) return;

					const birthDate = new Date(value);
					const today = new Date();

					birthDate.setHours(0, 0, 0, 0);
					today.setHours(0, 0, 0, 0);

					if (birthDate > today) {
						throw new Error(
							"La fecha de nacimiento no puede ser mayor a la fecha actual.",
						);
					}
				},
			},
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
