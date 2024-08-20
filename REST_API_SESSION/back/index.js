import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./route/UserRoute.js";
import ProdukRoute from "./route/ProdukRoute.js";
import AuthRoute from "./route/AuthRoute.js";
import SequelizeStore from "connect-session-sequelize";
import db from './config/Database.js';

// akifkan jika mau migrasi tabel
// (async()=>{
//     await db.sync();
// })();

dotenv.config();
const app = express();
const sessionStore = SequelizeStore(session.Store);
const storeSession = new sessionStore({
  db: db,
});
app.use(
  session({
    secret: process.env.APP_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: storeSession,
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

// storeSession.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}`);
});
