require("dotenv").config();
const PORT = process.env.PORT || 4000;

const express = require("express");
const userRoute = require("./routes/user_route.js");
const middlewareRequest = require("./middleware/logs.js");

var app = express();

app.use(middlewareRequest);
app.use(express.json());

// ketika sudah menggunakan routing file
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server running port :${PORT}`);
});
