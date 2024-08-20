const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const db = require("./app/models")

dotenv.config();
const app = express();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());

// const mongooseConfig = {
//     useNewUrlParser: true,
//     useFindAndModify:false,
//     useCreateIndex:true,
//     useUnifiedTopology: true
// }
// db.mongoose.connect(db.url.url, mongooseConfig);

// koneksi database
db.mongoose.connect(db.url.url)
    .then(() => {
        console.log("Database connected");
    })
    .catch(err => {
        console.log(`Database Not Connected ${err.message}`);
    });


// route
// memanggil routes mahasiswa
require("./app/routes/mahasiswa.routes")(app);

// port
const port = process.env.PORT;

// server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})