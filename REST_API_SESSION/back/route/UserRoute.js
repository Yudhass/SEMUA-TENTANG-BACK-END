import express  from "express";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/UserController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const routes = express.Router();

// Add routes
routes.get("/user",verifyUser,adminOnly, getUser);
routes.get("/user/:id", verifyUser, adminOnly, getUserById);
routes.post("/user", verifyUser, adminOnly, createUser);
routes.patch("/user/:id", verifyUser, adminOnly, updateUser);
routes.delete("/user/:id", verifyUser, adminOnly, deleteUser);

export default routes;
