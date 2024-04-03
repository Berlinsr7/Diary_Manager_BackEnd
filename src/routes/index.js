import express from "express"
import indexController from "../controller/index.js"
import userRoutes from "./userRoutes.js"

const router = express.Router()

router.get("/", indexController.home)
router.use("/users", userRoutes)

export default router