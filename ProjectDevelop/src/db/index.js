import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv"

dotenv.config(
    {
        path:"./env"
    }
)


const connectDB = async ()=>{
    try{
        console.log(process.env.PORT)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // const connectionInstance = await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${password}@cluster0.qjocurq.mongodb.net/${DB_NAME}`)
        //this connection method can be stored in a variable and it is a object with multiple methods 
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        // console.log(connectionInstance) this will give different methods of the mongo connection . To read for more
    } catch(error){
        console.log("MONGODB connection error", error);
        process.exit(1)
    }
}

export default connectDB