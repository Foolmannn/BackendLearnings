// console.log('Basic of the backend');
const express = require('express')
// Modern way is to use the modulejs instead of the common js
// import express from "express"
require('dotenv').config()


const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//here the app.get takes the route and the callback function with the request and response variable 

app.get('/twitter',(req,res)=> {
 res.send("This is the twitter page")
})
// just using the node will not reload the page until the restart 

app.get('/login',(req,res)=>{
    res.send("<h1>Please login</h1>")
})

app.get('/youtube',(req,res)=>{
    res.send("<h2>Watch the videos </h2>")
})


//.env is needed for the deployment as the some data are sensative . It just takes the variable from the .env file and injects in the code below 
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})

