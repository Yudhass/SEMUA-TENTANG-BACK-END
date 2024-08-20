import express from "express";
import {
  getProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controller/ProdukController.js";
const routes = express.Router();

// Add routes
routes.get("/produk", getProduk);
routes.get("/produk/:id", getProdukById);
routes.post("/produk", createProduk);
routes.patch("/produk/:id", updateProduk);
routes.delete("/produk/:id", deleteProduk);

export default routes;
