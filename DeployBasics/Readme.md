
---

# 🧠 1. What is Backend (basics)

The **backend** is everything that happens on the server.

👉 In simple terms:

* Frontend = what user sees (React)
* Backend = logic + database + APIs

### Backend responsibilities:

* Handle requests (from frontend)
* Process data (logic)
* Talk to database
* Send responses

---

## 🔄 How frontend ↔ backend works

```
React (frontend)
   ↓ fetch()
HTTP Request
   ↓
Server (Express backend)
   ↓
Database (optional)
   ↓
Response (JSON)
   ↑
React updates UI
```

---

# ⚙️ 2. What is Node.js

Node.js lets you run JavaScript **outside the browser**.

👉 Why it's used:

* Same language (JS) for frontend + backend
* Fast (event-driven)
* Huge ecosystem (npm)

---

# 🚀 3. What is Express.js

Express is a **minimal backend framework** for Node.js.

👉 It helps you:

* Create server easily
* Handle routes
* Manage requests & responses

---

# 📦 4. Basic Express Server

```bash
npm init -y
npm install express
```

### index.js

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

👉 Run:

```bash
node index.js
```

---

# 🌐 5. Important Concepts in Express

---

## 📍 1. Routing

Routing = deciding **what happens when a user hits a URL**

```js
app.get("/about", (req, res) => {
  res.send("About page");
});
```

### Types of routes:

* GET → fetch data
* POST → send data
* PUT → update
* DELETE → remove

---

## 📥 2. Request (`req`)

Contains data from client:

```js
app.get("/user", (req, res) => {
  console.log(req.query); // ?name=suman
});
```

Types of data:

* `req.params` → `/user/:id`
* `req.query` → `?name=suman`
* `req.body` → from frontend (POST)

---

## 📤 3. Response (`res`)

What server sends back:

```js
res.send("Hello");
res.json({ name: "Suman" });
res.status(404).send("Not found");
```

---

## 📦 4. Middleware (VERY IMPORTANT)

Middleware = function that runs **before request reaches route**

```js
app.use((req, res, next) => {
  console.log("Request received");
  next();
});
```

👉 Uses:

* Logging
* Authentication
* Parsing JSON

---

## 📄 5. JSON Handling

Frontend sends JSON → backend must read it:

```js
app.use(express.json());
```

Then:

```js
app.post("/data", (req, res) => {
  console.log(req.body);
});
```

---

## 🌍 6. CORS (Frontend ↔ Backend connection)

When React runs on different port → blocked by browser

Install:

```bash
npm install cors
```

```js
const cors = require("cors");
app.use(cors());
```

---

# 🔗 6. Connecting React to Express

### React (frontend)

```js
fetch("http://localhost:3000/api")
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### Express (backend)

```js
app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend" });
});
```

---

# 🗄️ 7. Database (basic idea)

Backend usually connects to DB like:

* MongoDB
* MySQL

Flow:

```
Client → Express → Database → Express → Client
```

---

# 🧩 8. Example: Simple Todo Backend

```js
const express = require("express");
const app = express();

app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.json({ message: "Todo added" });
});

app.listen(3000);
```

---

# 🔥 9. Full Flow (VERY IMPORTANT)

1. User clicks button in React
2. React sends POST request
3. Express receives it
4. Express processes data
5. Sends response
6. React updates UI

---

# ⚡ 10. Key Things You MUST Understand

If you understand these, you're already ahead:

* Request & Response cycle
* Routing
* Middleware
* JSON handling
* Fetch API
* CORS

---


