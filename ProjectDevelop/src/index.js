// require('dotenv').config({path: './env'})

// or we can do as below instead of the require syntax
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import connectDB from "./db/index.js";
//try to add the whole path with the extension as it causes the error


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed !!!", err);
  });




  import { app } from "./app.js"; //importing the app from the app.js file



/*

//While connecting to the db we must use the error handling and the async await as it may take some time . Always think that the DB is stored in Another continent
 function connectDB(){}

connectDB()


//this is not the best approach

//here this is IFFE ()() and the  ; is used to avoid the issue due to previous code . ie it clears the previous code executions

/*

mongoose.connect('mongodb://127.0.0.1:27017/test');
//here it is for local host . We have to replace the ip to the string of the db from the atlas

this
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

// this approach is not best approach as the both db and express are in single file it congests the file

*/