import express from "express";
import {
    Login,
    Logout,
    Me
} from "../controller/AuthController.js";
const routes = express.Router();

// Add routes
routes.get("/me", Me);
routes.post("/login", Login);
routes.delete("/logout", Logout);

export default routes;
