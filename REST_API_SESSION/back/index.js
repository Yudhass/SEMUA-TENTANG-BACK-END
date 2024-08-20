import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./route/UserRoute.js";
import ProdukRoute from "./route/ProdukRoute.js";
import AuthRoute from './route/AuthRoute.js';

// akifkan jika mau migrasi tabel
// import db from './config/Database.js';
// (async()=>{
//     await db.sync();
// })();

dotenv.config();
const app = express();

app.use(
  session({
    secret: process.env.APP_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(ProdukRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}`);
});
