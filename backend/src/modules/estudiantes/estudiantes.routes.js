const { Router } = require("express");
const {
	getEstudiantes,
	getEstudianteById,
	createEstudiante,
	updateEstudiante,
	deleteEstudiante,
} = require("./estudiantes.controller");

const router = Router();

router.get("/", getEstudiantes);
router.get("/:id", getEstudianteById);
router.post("/", createEstudiante);
router.put("/:id", updateEstudiante);
router.delete("/:id", deleteEstudiante);

module.exports = router;
