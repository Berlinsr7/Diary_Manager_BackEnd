import mongoose from "./index.js"

const subSchema = new mongoose.Schema({
    noteId: {
        type: Number
      },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    date:{
      type:String,
    }
  })

const userSchema = new mongoose.Schema({
    userId:{
      type:Number,
      required:true,
      unique:true,
      message:"Id is Required"
    },
    userName:{
      type:String,
      required:true,
      message:"Name is Required"
    },
    email:{
      type:String,
      required:true,
      message:"Name is Required"
    },
    password:{
      type:String,
      required:true,
      message:"Password is Required"
    },
    userNotes:[subSchema]
},
{
    versionKey:false,
    collection:'DiaryApp'
})



const userModel = mongoose.model('DiaryApp', userSchema)

export default userModel 