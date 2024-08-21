import express from "express";
import {
  getProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controller/ProdukController.js";
import { verifyUser } from "../middleware/AuthUser.js";
const routes = express.Router();

// Add routes
routes.get("/produk",verifyUser, getProduk);
routes.get("/produk/:id", verifyUser, getProdukById);
routes.post("/produk", verifyUser, createProduk);
routes.patch("/produk/:id", verifyUser, updateProduk);
routes.delete("/produk/:id", verifyUser, deleteProduk);

export default routes;
