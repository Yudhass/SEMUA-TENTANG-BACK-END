const express = require("express");
const router = express.Router();
const petugasController = require("../controller/petugas_controller");

// bagian petugas
router.get("/", petugasController.getAllPetugas);
router.get("/:id", petugasController.getPetugasById);
router.post("/", petugasController.createPetugas);
router.put("/:id", petugasController.updatePetugasById);
router.delete("/:id", petugasController.deletePetugasById);

module.exports = router;
