const express = require("express");
const userRoute = require("./routes/user_route.js");

var app = express();

// ketika sudah menggunakan routing file
app.use("/user", userRoute);

// contoh routing
// app.use("/",(req, res, next)=>{
//     res.send('Hello world')
// })

// app.get("/",(req,res)=>{
//     res.send('Ini method get');
// })

// app.get("/", (req, res) => {
//   res.json({
//     nama:"yudhas",
//     alamat:"lampung"
//   })
// });

app.listen(4000, () => {
  console.log("Server running port 4000");
});
