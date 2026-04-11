import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true

}))
//to avoid the overload we can limit the data submitted using the middleware as below for json
app.use(express.json({
    limit: "16kb"
}))
// sometimes when using the url to receive the data we need to use the encoding to avoid the misreading of the special characters like space is %20 etc
app.use(express.urlencoded({extended:true, limit: "16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

//routes import

import userRouter from "./routes/user.route.js" // this only works when we are exporting as default 




//routes declaration
app.use("/api/v1/users",userRouter)

// http://localhost:8000/api/v1/users/register

export { app } 