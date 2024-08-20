const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const petugasController = require("../controller/petugas_controller");
const userController = require("../controller/user_controller");


// bagian user
router.get("/user", verifyToken, userController.getUser);
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.get("/refresh_token", userController.refreshToken);

// bagian petugas
router.get("/petugas", petugasController.getAllPetugas);
router.get("/petugas/:id", petugasController.getPetugasById);
router.post("/petugas", petugasController.createPetugas);
router.put("/petugas/:id", petugasController.updatePetugasById);
router.delete("/petugas/:id", petugasController.deletePetugasById);

module.exports = router;
