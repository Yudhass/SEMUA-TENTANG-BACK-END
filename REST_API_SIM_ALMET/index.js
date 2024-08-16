require("dotenv").config();
const PORT = process.env.PORT || 4000;

const express = require('express');
const petugasRoute = require("./routes/petugas_route.js");


var app = express();
app.use(express.json())
// route untuk data petugas
app.use('/petugas',petugasRoute);

app.listen(PORT,()=>{
    console.log(`Server running on port : ${PORT}`);
    
})