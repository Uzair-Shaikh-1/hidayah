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
  origin: "http://localhost:5173", // Your React/Vite app URL
  credentials: true,               // Allows headers/cookies/credentials
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
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