import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoutes.js";

const app = express();

// koneksi db
mongoose.connect('mongodb://localhost:27017/fulstack_db');
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log("Database Terhubung"));

app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(5000, () => console.log("Server Jalan Gan"));