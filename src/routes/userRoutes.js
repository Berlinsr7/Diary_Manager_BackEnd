import express from "express"
import userController from "../controller/users.js"
import notesController from "../controller/notes.js"

const router = express.Router()

router.post("/", userController.create)
router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.put("/:id", userController.edit)
router.delete("/:id", userController.del)
router.post("/login", userController.login)

router.get("/:id/notes", notesController.getAllNotes)
router.post("/:id/notes", notesController.create)
router.get("/:id/notes/:noteId", notesController.getNoteByID)
router.put("/:id/notes/:noteId", notesController.editNote)
router.delete("/:id/notes/:noteId", notesController.deleteNote)

export default router