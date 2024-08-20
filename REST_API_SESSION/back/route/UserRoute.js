import express  from "express";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/UserController.js";
const routes = express.Router();

// Add routes
routes.get("/user", getUser);
routes.get("/user/:id", getUserById);
routes.post("/user", createUser);
routes.patch("/user/:id", updateUser);
routes.delete("/user/:id", deleteUser);

export default routes;
