const Carrera = require("./carrera.model");

const getCarreras = async (req, res, next) => {
	try {
		const carreras = await Carrera.findAll({
			order: [["nombre", "ASC"]],
		});

		return res.status(200).json(carreras);
	} catch (error) {
		return next(error);
	}
};

const createCarrera = async (req, res, next) => {
	try {
		const { nombre } = req.body;

		if (!nombre || !String(nombre).trim()) {
			return res.status(400).json({ message: "El nombre de la carrera es requerido." });
		}

		const existente = await Carrera.findOne({ where: { nombre: String(nombre).trim() } });
		if (existente) {
			return res.status(409).json({ message: "La carrera ya existe." });
		}

		const carrera = await Carrera.create({ nombre: String(nombre).trim() });
		return res.status(201).json(carrera);
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	getCarreras,
	createCarrera,
};
