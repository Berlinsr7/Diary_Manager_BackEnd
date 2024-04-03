import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import appRouter from "./src/routes/index.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(appRouter)

app.listen(PORT, ()=> console.log("app listening in ",PORT))