import { useState } from 'react'

import './App.css'

function App() {
  const [jokes, setjokes] = useState([])

  return (
 <>
 <h1>Have some Funn..</h1>
 <p>JOKES: {jokes.length}</p>
{
  jokes.map((joke, index)=>{
    <div key ={joke.id}>
      <div>{joke.title}</div>
      <div>{joke.content}</div>
      </div>
    })
}

 </>
  )
}

export default App
