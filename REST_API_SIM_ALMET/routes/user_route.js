const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");


router.get("/", userController.getUser);
// router.get("/:id", petugasController.getPetugasById);
// router.post("/", petugasController.createPetugas);
// router.put("/:id", petugasController.updatePetugasById);
// router.delete("/:id", petugasController.deletePetugasById);

module.exports = router;
