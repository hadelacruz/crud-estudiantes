require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./config/database");

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
	try {
		await sequelize.authenticate();
		console.log("Conexion a MySQL establecida.");

		if (process.env.DB_SYNC === "true") {
			await sequelize.sync();
			console.log("Modelos sincronizados.");
		}

		app.listen(PORT, () => {
			console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("No se pudo iniciar el servidor:", error.message);
		process.exit(1);
	}
};

startServer();
