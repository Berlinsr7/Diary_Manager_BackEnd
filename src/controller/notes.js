import userModel from "../model/users.js"

const create = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await userModel.findOne({userId : id})
        const notes = user.userNotes
        const note = req.body
        notes.push(note)
        await userModel.updateOne({userId : id},{$set : {userNotes: notes}})
        res.status(200).send({message: "Note added Successfully"}) 
    } catch (error) {
        res.status(500).send({message: error.message || "Server Error"})
    }
}

const getAllNotes = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await userModel.findOne({userId : id})
        const notes = user.userNotes
        res.status(200).send({message: "Notes fetched Successfully", notes}) 
    } catch (error) {
        res.status(500).send({message: error.message || "Server Error"})
    }
}

const getNoteByID = async (req,res)=>{
    try {
        const {id, noteId} = req.params
        const user = await userModel.findOne({userId : id})
        const note = user.userNotes.find(note => note.noteId == noteId)
        res.status(200).send({message: "Notes fetched Successfully", note}) 
    } catch (error) {
        res.status(500).send({message: error.message || "Server Error"})
    }
}

const editNote = async (req,res)=>{
    try {
        const {id, noteId} = req.params
        const {name, description} = req.body
        const user = await userModel.findOne({userId : id})
        const note = user.userNotes.find(note => note.noteId == noteId)
        note.name = name
        note.description = description
        const result = [...user.userNotes]
        await userModel.updateOne({userId : id},{$set : {userNotes: result}})
        res.status(200).send({message: "Notes Edited Successfully", result}) 
    } catch (error) {
        res.status(500).send({message: error.message || "Server Error"})
    }
}

const deleteNote = async (req,res)=>{
    try {
        const {id, noteId} = req.params
        const user = await userModel.findOne({userId : id})
        const note = user.userNotes.findIndex(note => note.noteId == noteId)
        user.userNotes.splice(note,1)
        const result = [...user.userNotes]
        await userModel.updateOne({userId : id},{$set : {userNotes: result}})
        res.status(200).send({message: "Note deleted Successfully"}) 
    } catch (error) {
        res.status(500).send({message: error.message || "Server Error"})
    }
}

export default { create, getAllNotes, getNoteByID, editNote, deleteNote }