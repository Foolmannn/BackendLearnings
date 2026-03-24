// console.log('Basic of the backend');
const express = require('express')
// Modern way is to use the modulejs instead of the common js
// import express from "express"
require('dotenv').config()


const app = express()

const port = 3000

const githubdata = {
  "login": "Foolmannn",
  "id": 170800192,
  "node_id": "U_kgDOCi40QA",
  "avatar_url": "https://avatars.githubusercontent.com/u/170800192?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/Foolmannn",
  "html_url": "https://github.com/Foolmannn",
  "followers_url": "https://api.github.com/users/Foolmannn/followers",
  "following_url": "https://api.github.com/users/Foolmannn/following{/other_user}",
  "gists_url": "https://api.github.com/users/Foolmannn/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/Foolmannn/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/Foolmannn/subscriptions",
  "organizations_url": "https://api.github.com/users/Foolmannn/orgs",
  "repos_url": "https://api.github.com/users/Foolmannn/repos",
  "events_url": "https://api.github.com/users/Foolmannn/events{/privacy}",
  "received_events_url": "https://api.github.com/users/Foolmannn/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Suman Pun Magar",
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": "Currently student at Amrit science campus, Lainchaur,Kathmandu, Nepal",
  "twitter_username": null,
  "public_repos": 9,
  "public_gists": 0,
  "followers": 0,
  "following": 2,
  "created_at": "2024-05-25T10:07:20Z",
  "updated_at": "2026-03-20T15:03:10Z"
}

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

app.get('/github',(req,res)=>{
res.json(githubdata)
})


//.env is needed for the deployment as the some data are sensative . It just takes the variable from the .env file and injects in the code below 
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})

