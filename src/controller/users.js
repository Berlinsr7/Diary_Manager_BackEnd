import userModel from "../model/users.js"
import Auth from '../common/Auth.js'

const create = async (req, res)=>{
    try {
        let user1 = req.body
        let user = await userModel.findOne({email:user1.email})

        if(!user)
        {
            user1.password = await Auth.hashPassword(user1.password)
            await userModel.insertMany(user1)

            res.status(200).send({
                message:"User Created Successfully"
            })
        }
        else
        {
            res.status(400).send({
                message:`User with ${user1.email} already exists`
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }    
}

const getAllUsers = async (req, res)=>{
    try {
        const users = await userModel.find();
        users.length != 0 ? res.status(200).send({
            message: "Data fetched Successfully",users}) : res.status(400).send({message: "Enter Data first"})    
    } catch (error) {
        res.status(500).send({message: error.message || "Server Error"})
    }
}

const getUserById = async (req, res)=>{
    try {
        const {id} = req.params
        const result = await userModel.find({userId : id});
        res.status(200).send({message: "Data fetched Successfully", result})         
    } catch (error) {
        res.status(500).send({message: error.message || "Server Error"})
    }
}

const edit = async (req, res)=>{
    try {
        const {id} = req.params
        const updated = req.body
        const result = await userModel.updateOne({userId: id},{$set: updated}) 
        res.status(200).send({message: "Data edited Successfully", result})  
    } catch (error) {
        res.status(500).send({message: error.message || "Server Error"})
    }     
}

const del = async (req, res)=>{
    try {
        const {id} = req.params
        const result = await userModel.deleteOne({userId: id}) 
        res.status(200).send({message: "Deleted Successfully", result})  
    } catch (error) {
        res.status(500).send({message: error.message || "Server Error"})
    }
    
}

const login = async(req,res)=>{
    try {
        let {email,password} = req.body
        let user = await userModel.findOne({email:email})

        if(user)
        {
            if(await Auth.hashCompare(password,user.password))
            {
                let token = await Auth.createToken({
                    email,
                    id:user._id
                })

                res.status(200).send({
                    message:"Login Successful",
                    token,
                    name:user.userName,
                    userId: user.userId
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorrect Password!"
                })
            }
        }
        else
        {
            res.status(400).send({
                message:"User Does Not Exists"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
}

export default {create, getAllUsers, getUserById, edit, del, login}