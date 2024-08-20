require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const apiRoute = require("./routes/api.js");
const express = require("express");

const PORT = process.env.PORT || 4000;

var app = express();
var corsOptions = {
  origin: "http://localhost:4000",
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// route untuk semua
app.use("/", apiRoute);

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
