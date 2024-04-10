import express from "express"
import userController from "../controller/users.js"
import notesController from "../controller/notes.js"
import validate from '../middleware/Validate.js'

const router = express.Router()

router.post("/", userController.create)
router.get("/", userController.getAllUsers)
router.get("/:id",validate, userController.getUserById)
router.put("/:id",validate, userController.edit)
router.delete("/:id",validate, userController.del)
router.post("/login", userController.login)

router.get("/:id/notes", validate, notesController.getAllNotes)
router.post("/:id/notes", validate, notesController.create)
router.get("/:id/notes/:noteId", validate, notesController.getNoteByID)
router.put("/:id/notes/:noteId", validate, notesController.editNote)
router.delete("/:id/notes/:noteId", validate, notesController.deleteNote)

export default router