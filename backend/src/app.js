const express = require("express");
const cors = require("cors");

const carrerasRoutes = require("./modules/carreras/carrera.routes");
const estudiantesRoutes = require("./modules/estudiantes/estudiantes.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
	res.status(200).json({ message: "API activa" });
});

app.use("/api/carreras", carrerasRoutes);
app.use("/api/estudiantes", estudiantesRoutes);

app.use((req, res) => {
	res.status(404).json({ message: "Ruta no encontrada." });
});

app.use((error, req, res, next) => {
	console.error(error);

	if (error.name === "SequelizeValidationError") {
		return res.status(400).json({
			message: "Error de validación.",
			details: error.errors.map((e) => e.message),
		});
	}

	return res.status(500).json({ message: "Error interno del servidor." });
});

module.exports = app;
