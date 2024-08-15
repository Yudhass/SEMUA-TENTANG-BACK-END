const express = require("express");
const UserController = require('../controller/user_controller.js');

const router = express.Router();

router.get("/", UserController.getAllUser);
router.post("/", UserController.createUser);

module.exports = router;
