const { Router } = require("express");
const { createCarrera, getCarreras } = require("./carrera.controller");

const router = Router();

router.get("/", getCarreras);
router.post("/", createCarrera);

module.exports = router;
