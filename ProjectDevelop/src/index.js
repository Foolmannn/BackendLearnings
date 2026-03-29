//While connecting to the db we must use the error handling and the async await as it may take some time . Always think that the DB is stored in Another continent

import mongoose from "mongoose";
import env from "dotenv";
import { DB_NAME } from "./constants";
import express from "express"

const app = express()


/* function connectDB(){}

connectDB()

*/
//this is the not the best approach


//here this is IFFE ()() and the  ; is used to avoid the issue due to previous code . ie it clears the previous code executions


/*
;(async () => {
    try{
       await mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("ERRR:", error)
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
       })
    }
    catch(error) {
        console.error("ERROR:",error)
        throw err
    }
})()

*/
// this approach is not best approach as the both db and express are in single file it congests the file 