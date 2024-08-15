const express = require("express");
const UserController = require('../controller/user_controller.js');

const router = express.Router();

// create user data
router.post("/", UserController.createUser);
// get all data user
router.get("/", UserController.getAllUser);
// update -patch
router.patch("/:id/:kode", UserController.updateUser);
// delete - delete
router.delete("/:id", UserController.deleteUser);

module.exports = router;
