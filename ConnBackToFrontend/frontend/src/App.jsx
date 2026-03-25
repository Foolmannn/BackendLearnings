import { useState } from "react";
import axios from "axios";

import "./App.css";
import { useEffect } from "react";

function App() {
  const [jokes, setjokes] = useState([]);
  useEffect(() => {
    axios
      .get("/api/jokes") //using the proxy 
      .then((Response) => {
        setjokes(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <h1>Have some Funn..</h1>
      <p>JOKES: {jokes.length}</p>
      {jokes.map((joke, index) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  );
}

export default App;
