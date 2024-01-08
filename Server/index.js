import express from "express";
import cors from 'cors'
import router from "./Routes/AdminRoute.js";

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET','POST','PUT'],
    credentials: true
}))
app.use(express.json())
app.use('/auth', router)

app.listen(3000,() => {
    console.log("Server is running")
});