import express from "express";
const app = express();
// to use the .env we need 
import dotenv from "dotenv";
dotenv.config();

app.get("/", (req, res) => {
  res.send("server is ready");
});


///api/jokes is the standard way of the writing the routes 
app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "Joke 1",
      content: "Why don't programmers like nature? Too many bugs.",
    },
    {
      id: 2,
      title: "Joke 2",
      content: "Why do Java developers wear glasses? Because they don't C#.",
    },
    {
      id: 3,
      title: "Joke 3",
      content:
        "Why did the computer get cold? Because it forgot to close its Windows.",
    },
    {
      id: 4,
      title: "Joke 4",
      content:
        "Why did the developer go broke? Because he used up all his cache.",
    },
    {
      id: 5,
      title: "Joke 5",
      content:
        "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    },
    {
      id: 6,
      title: "Joke 6",
      content: "Why did the function return early? Because it had a timeout.",
    },
  ];
  res.send(jokes);
});

const port = process.env.PORT || 3000 ;

// This or 3000 is to avoid the breaking of the app due to the  misconfiguration of the env 
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
