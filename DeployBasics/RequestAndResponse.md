
---

# 🧠 Big Picture First

Every time a client (like React) hits your backend:

```text
Client → Request (req) → Server (Express) → Response (res) → Client
```

👉 Think of it like:

* `req` = **incoming data**
* `res` = **outgoing reply**

---

# 📥 1. REQUEST (`req`) — Everything the client sends

`req` is an object created by Express that contains **all details about the incoming request**.

---

## 🔹 1.1 URL Parameters (`req.params`)

Used when values are part of the URL.

```js
app.get("/user/:id", (req, res) => {
  console.log(req.params.id);
});
```

👉 Example:

```
GET /user/101
```

👉 Output:

```
101
```

---

## 🔹 1.2 Query Parameters (`req.query`)

Used for filters/search.

```js
app.get("/search", (req, res) => {
  console.log(req.query);
});
```

👉 Example:

```
/search?name=suman&age=20
```

👉 Output:

```js
{ name: "suman", age: "20" }
```

---

## 🔹 1.3 Request Body (`req.body`) ⚠️ MOST USED

Used in POST/PUT requests.

```js
app.use(express.json());

app.post("/user", (req, res) => {
  console.log(req.body);
});
```

👉 Example (from frontend):

```js
fetch("/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Suman" })
});
```

👉 Output:

```js
{ name: "Suman" }
```

---

## 🔹 1.4 Headers (`req.headers`)

Extra info sent by client:

```js
console.log(req.headers);
```

👉 Common headers:

* `Content-Type`
* `Authorization`
* `User-Agent`

---

## 🔹 1.5 HTTP Method (`req.method`)

```js
console.log(req.method);
```

👉 Output:

```
GET / POST / PUT / DELETE
```

---

## 🔹 1.6 Request URL (`req.url`)

```js
console.log(req.url);
```

---

## 🔹 1.7 Important Real Example

```js
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
});
```

👉 This is how login systems work.

---

# 📤 2. RESPONSE (`res`) — What server sends back

`res` is used to **send data back to the client**.

---

## 🔹 2.1 `res.send()`

Basic response:

```js
res.send("Hello World");
```

👉 Can send:

* String
* HTML
* Buffer

---

## 🔹 2.2 `res.json()` ⭐ MOST IMPORTANT

Send JSON data:

```js
res.json({ name: "Suman", age: 20 });
```

👉 This is what React usually expects.

---

## 🔹 2.3 `res.status()`

Set HTTP status code:

```js
res.status(404).send("Not Found");
```

---

## 🔹 2.4 Chaining

```js
res.status(200).json({ message: "Success" });
```

---

## 🔹 2.5 `res.sendFile()`

Send files:

```js
res.sendFile(__dirname + "/index.html");
```

---

## 🔹 2.6 `res.redirect()`

```js
res.redirect("/home");
```

---

## 🔹 2.7 `res.end()`

Ends response manually:

```js
res.end();
```

---

# 🔄 3. Full Request–Response Example

```js
app.post("/todos", (req, res) => {
  const todo = req.body;

  if (!todo.text) {
    return res.status(400).json({ error: "Text is required" });
  }

  res.status(201).json({
    message: "Todo created",
    todo: todo
  });
});
```

---

# ⚠️ 4. Common Mistakes (IMPORTANT)

---

## ❌ 1. Forgetting `express.json()`

```js
app.use(express.json());
```

Without this → `req.body` = undefined

---

## ❌ 2. Sending multiple responses

```js
res.send("Hello");
res.send("Again"); ❌ ERROR
```

👉 Only ONE response per request.

---

## ❌ 3. Not returning after response

```js
if (!user) {
  res.status(404).send("User not found");
}
res.send("Done"); ❌ runs again
```

✔ Fix:

```js
if (!user) {
  return res.status(404).send("User not found");
}
```

---

# 🧩 5. Real Life Flow (Your Todo App)

### React sends:

```js
fetch("/todos", {
  method: "POST",
  body: JSON.stringify({ text: "Learn Express" }),
  headers: { "Content-Type": "application/json" }
});
```

---

### Express receives:

```js
app.post("/todos", (req, res) => {
  console.log(req.body.text);
});
```

---

### Express responds:

```js
res.json({ message: "Todo added" });
```

---

### React gets:

```js
.then(res => res.json())
.then(data => console.log(data.message));
```

---

# 🔥 6. Mental Model (VERY IMPORTANT)

Think like this:

| Thing | Meaning                        |
| ----- | ------------------------------ |
| `req` | "What did the client send me?" |
| `res` | "What should I send back?"     |

---

# 🚀 If you want next level


