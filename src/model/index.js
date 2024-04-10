import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const MongoUrl = process.env.MONGO_URL

const main = async ()=>{
    await mongoose.connect(`${MongoUrl}`)
    console.log('Db connection established')
}

main().catch(err => console.log(err))

export default mongoose