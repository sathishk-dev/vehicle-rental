import "dotenv/config";

import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import dbConnect from './config/db.js'

import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import vehicleRoutes from "./routes/vehicleRoutes.js"

const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: ['https://vehicle-rental-gamma.vercel.app','http://localhost:5173'],
    credentials: true
}))

dbConnect();


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/vehicle", vehicleRoutes)


app.get("/", (req, res) => {
    res.send("Welcom to kss vehicle rendal app...");
})

app.listen(3001, () => {
    console.log("Server is Running on : http://localhost:3001")
})
