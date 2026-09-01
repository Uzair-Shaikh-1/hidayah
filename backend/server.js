
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const cookieParser = require("cookie-parser")
const cors = require("cors")
app.use(express.json())

// 1. Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser requests (like Postman or server-to-server)
    if (!origin) return callback(null, true);

    if (
      origin === "http://localhost:5173" ||
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200 // Returns 200 instead of 204 for preflight checks
};

// 2. Apply CORS middleware BEFORE your routes
app.use(cors(corsOptions));
app.use(cookieParser())
const connectDb = require("./connectdb/db")


// Book route
const bookRoutes = require("./routes/Bookroutes")
app.use("/api/books",bookRoutes)

// Lecture route
const lectureRoutes = require("./routes/lectureRoutes")
app.use("/api/lectures",lectureRoutes)

// user route
const userRoutes = require("./routes/userRoutes")
app.use("/api/auth",userRoutes)


const start = async() =>{
    try
    {
await connectDb(process.env.MONGO_URI)
console.log(`connected to DB`)
app.listen(PORT, console.log(`server is listening on port ${PORT}...`))

    }catch(err){
        console.log(`error in listeining the app ${err}`)
    }
}

start()

module.exports = app;