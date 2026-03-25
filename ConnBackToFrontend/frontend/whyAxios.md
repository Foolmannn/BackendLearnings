**Axios** is a popular JavaScript library used to make HTTP requests (GET, POST, PUT, DELETE, etc.) from the browser or Node.js. It’s commonly used in **React + Express apps** for communication between frontend and backend.

https://www.npmjs.com/package/axios

---

# 🚀 What is Axios?

* Promise-based HTTP client
* Works in **browser + Node.js**
* Easier than `fetch()`
* Automatically handles JSON

---

# 📦 Installation

```bash
npm install axios
```

---

# 🔥 Basic Usage

## 1. GET Request (fetch data)

```js
import axios from "axios";

axios.get("http://localhost:5000/api/data")
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.error(err);
  });
```

---

## 2. POST Request (send data)

```js
axios.post("http://localhost:5000/api/data", {
  name: "Suman",
  age: 20
})
.then(res => {
  console.log(res.data);
});
```

---

## 3. Using async/await (better way)

```js
const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/data");
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
```

---

# ⚙️ Axios Response Structure

When you call Axios:

```js
const res = await axios.get(url);
```

You get:

```js
res.data       // actual data from backend
res.status     // status code (200, 404, etc.)
res.headers    // response headers
res.config     // request config
```

---

# 🔁 Axios vs Fetch

| Feature               | Axios ✅ | Fetch ❌             |
| --------------------- | ------- | ------------------- |
| Auto JSON             | Yes     | No (need `.json()`) |
| Error handling        | Better  | Manual              |
| Interceptors          | Yes     | No                  |
| Timeout               | Easy    | Hard                |
| Older browser support | Yes     | No                  |

---

# 🧠 Interceptors (Very Important)

Used to modify requests/responses globally.

## Example:

```js
axios.interceptors.request.use(config => {
  console.log("Request sent");
  return config;
});
```

---

# 🔐 Sending Headers (e.g., token)

```js
axios.get("/api", {
  headers: {
    Authorization: "Bearer token_here"
  }
});
```

---

# 🌐 Base URL Setup (Best Practice)

```js
const api = axios.create({
  baseURL: "http://localhost:5000"
});

api.get("/users");
```

---

# 🔄 Connecting React → Express (Flow)

1. React sends request using Axios
2. Express receives it (`req`)
3. Backend processes data
4. Express sends response (`res`)
5. Axios receives response

---

# ⚠️ Common Errors

### ❌ CORS error

Fix in Express:

```js
import cors from "cors";
app.use(cors());
```

---

### ❌ Wrong URL / Port

Make sure:

* Backend is running
* Correct port (`5000`, etc.)

---

### ❌ Undefined response

Always use:

```js
res.data
```

not `res`

---

# 💡 Real Example (React)

```js
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/todos")
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      {data.map(item => (
        <p key={item.id}>{item.text}</p>
      ))}
    </div>
  );
}
```

---

# 🧩 When should you use Axios?

Use Axios when:

* You are working with APIs
* You need clean syntax
* You want better error handling
* You are building full-stack apps

---

