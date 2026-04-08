const Estudiante = require("./estudiantes.model");
const Carrera = require("../carreras/carrera.model");

const includeCarrera = {
	model: Carrera,
	as: "carrera",
	attributes: ["id", "nombre"],
};

const getEstudiantes = async (req, res, next) => {
	try {
		const estudiantes = await Estudiante.findAll({
			include: [includeCarrera],
			order: [["id", "DESC"]],
		});

		return res.status(200).json(estudiantes);
	} catch (error) {
		return next(error);
	}
};

const getEstudianteById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const estudiante = await Estudiante.findByPk(id, {
			include: [includeCarrera],
		});

		if (!estudiante) {
			return res.status(404).json({ message: "Estudiante no encontrado." });
		}

		return res.status(200).json(estudiante);
	} catch (error) {
		return next(error);
	}
};

const createEstudiante = async (req, res, next) => {
	try {
		const { nombre, apellido, email, fecha_nacimiento, carrera_id } = req.body;

		const errores = {};

		if (!nombre || !String(nombre).trim()) {
			errores.nombre = "El campo nombre es requerido.";
		}

		if (!apellido || !String(apellido).trim()) {
			errores.apellido = "El campo apellido es requerido.";
		}

		if (!email || !String(email).trim()) {
			errores.email = "El campo email es requerido.";
		}

		if (carrera_id === undefined || carrera_id === null || carrera_id === "") {
			errores.carrera_id = "El campo carrera_id es requerido.";
		}

		if (Object.keys(errores).length > 0) {
			return res.status(400).json({
				message: "Hay campos requeridos faltantes.",
				errores,
			});
		}

		const carrera = await Carrera.findByPk(carrera_id);
		if (!carrera) {
			return res.status(400).json({ message: "La carrera indicada no existe." });
		}

		const nuevo = await Estudiante.create({
			nombre: String(nombre).trim(),
			apellido: String(apellido).trim(),
			email: String(email).trim().toLowerCase(),
			fecha_nacimiento: fecha_nacimiento ?? null,
			carrera_id,
		});

		const estudiante = await Estudiante.findByPk(nuevo.id, {
			include: [includeCarrera],
		});

		return res.status(201).json(estudiante);
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			return res.status(409).json({ message: "El email ya está registrado." });
		}
		return next(error);
	}
};

const updateEstudiante = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { nombre, apellido, email, fecha_nacimiento, carrera_id } = req.body;

		const estudiante = await Estudiante.findByPk(id);
		if (!estudiante) {
			return res.status(404).json({ message: "Estudiante no encontrado." });
		}

		if (carrera_id !== undefined) {
			const carrera = await Carrera.findByPk(carrera_id);
			if (!carrera) {
				return res.status(400).json({ message: "La carrera indicada no existe." });
			}
		}

		await estudiante.update({
			nombre: nombre !== undefined ? String(nombre).trim() : estudiante.nombre,
			apellido: apellido !== undefined ? String(apellido).trim() : estudiante.apellido,
			email: email !== undefined ? String(email).trim().toLowerCase() : estudiante.email,
			fecha_nacimiento:
				fecha_nacimiento !== undefined ? fecha_nacimiento : estudiante.fecha_nacimiento,
			carrera_id: carrera_id !== undefined ? carrera_id : estudiante.carrera_id,
		});

		const actualizado = await Estudiante.findByPk(id, {
			include: [includeCarrera],
		});

		return res.status(200).json(actualizado);
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			return res.status(409).json({ message: "El email ya está registrado." });
		}
		return next(error);
	}
};

const deleteEstudiante = async (req, res, next) => {
	try {
		const { id } = req.params;
		const estudiante = await Estudiante.findByPk(id);

		if (!estudiante) {
			return res.status(404).json({ message: "Estudiante no encontrado." });
		}

		await estudiante.destroy();
		return res.status(200).json({ message: "Estudiante eliminado correctamente." });
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	getEstudiantes,
	getEstudianteById,
	createEstudiante,
	updateEstudiante,
	deleteEstudiante,
};
