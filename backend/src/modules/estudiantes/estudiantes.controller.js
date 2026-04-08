const Estudiante = require("./estudiantes.model");
const Carrera = require("../carreras/carrera.model");
const {
	validateEstudianteInput,
	normalizeEstudiantePayload,
} = require("./estudiante.validator");

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
		const errores = validateEstudianteInput(req.body, { isPartial: false });

		if (Object.keys(errores).length > 0) {
			return res.status(400).json({
				message: "Hay errores de validación.",
				errores,
			});
		}

		const payload = normalizeEstudiantePayload(req.body);

		const carrera = await Carrera.findByPk(payload.carrera_id);
		if (!carrera) {
			return res.status(400).json({ message: "La carrera indicada no existe." });
		}

		const nuevo = await Estudiante.create({
			nombre: payload.nombre,
			apellido: payload.apellido,
			email: payload.email,
			fecha_nacimiento: payload.fecha_nacimiento,
			carrera_id: payload.carrera_id,
		});

		const estudiante = await Estudiante.findByPk(nuevo.id, {
			include: [includeCarrera],
		});

		return res.status(201).json(estudiante);
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			return res.status(409).json({ message: "El email ya está registrado." });
		}

		if (error.name === "SequelizeValidationError") {
			return res.status(400).json({
				message: "Hay errores de validación.",
				errores: error.errors.reduce((acc, item) => {
					acc[item.path] = item.message;
					return acc;
				}, {}),
			});
		}

		return next(error);
	}
};

const updateEstudiante = async (req, res, next) => {
	try {
		const { id } = req.params;
		const errores = validateEstudianteInput(req.body, { isPartial: true });
		if (Object.keys(errores).length > 0) {
			return res.status(400).json({
				message: "Hay errores de validación.",
				errores,
			});
		}

		const payload = normalizeEstudiantePayload(req.body);

		const estudiante = await Estudiante.findByPk(id);
		if (!estudiante) {
			return res.status(404).json({ message: "Estudiante no encontrado." });
		}

		if (payload.carrera_id !== undefined) {
			const carrera = await Carrera.findByPk(payload.carrera_id);
			if (!carrera) {
				return res.status(400).json({ message: "La carrera indicada no existe." });
			}
		}

		await estudiante.update({
			nombre: payload.nombre !== undefined ? payload.nombre : estudiante.nombre,
			apellido: payload.apellido !== undefined ? payload.apellido : estudiante.apellido,
			email: payload.email !== undefined ? payload.email : estudiante.email,
			fecha_nacimiento:
				payload.fecha_nacimiento !== undefined
					? payload.fecha_nacimiento
					: estudiante.fecha_nacimiento,
			carrera_id:
				payload.carrera_id !== undefined
					? payload.carrera_id
					: estudiante.carrera_id,
		});

		const actualizado = await Estudiante.findByPk(id, {
			include: [includeCarrera],
		});

		return res.status(200).json(actualizado);
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			return res.status(409).json({ message: "El email ya está registrado." });
		}

		if (error.name === "SequelizeValidationError") {
			return res.status(400).json({
				message: "Hay errores de validación.",
				errores: error.errors.reduce((acc, item) => {
					acc[item.path] = item.message;
					return acc;
				}, {}),
			});
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
