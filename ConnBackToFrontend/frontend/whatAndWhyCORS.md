
**CORS** is one of the most important (and confusing) topics when connecting your **React frontend → Express backend**.

https://www.npmjs.com/package/cors

---

# 🌐 What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a **browser security policy**.

It controls:

> ❌ Which websites are allowed to request data from another website/server

---

## 🧠 What is an “Origin”?

An origin = **protocol + domain + port**

Examples:

* `http://localhost:3000` ❗
* `http://localhost:5000` ❗ (different port = different origin)

So:
👉 React (`localhost:3000`)
👉 Express (`localhost:5000`)

➡️ These are **different origins → CORS applies**

---

# 🚫 What happens without CORS?

If your React app tries:

```js
axios.get("http://localhost:5000/api")
```

Browser says:

```
Access to fetch blocked by CORS policy ❌
```

👉 Because backend didn’t allow it.

---

# 🔥 Why CORS Exists

To prevent attacks like:

* Stealing user data
* Unauthorized API access
* Session hijacking

---

# ✅ How to Fix CORS in Express

## 1. Install CORS middleware

```bash
npm install cors
```

---

## 2. Use it in your server

```js
import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); // ✅ allow all origins
```

---

## 🎯 Better (secure way)

Instead of allowing everyone:

```js
app.use(cors({
  origin: "http://localhost:3000"
}));
```

👉 Only your React app can access it.

---

# ⚙️ How CORS Works Internally

## 🟢 Simple Request

For GET/POST (simple ones):

Browser sends:

```
Origin: http://localhost:3000
```

Server must respond with:

```
Access-Control-Allow-Origin: http://localhost:3000
```

---

## 🔵 Preflight Request (IMPORTANT)

For complex requests (PUT, DELETE, headers, etc.)

Browser first sends:

```
OPTIONS /api
```

Server must respond with:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

Then actual request is sent.

---

# 🧩 Full Example (Express)

```js
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/api", (req, res) => {
  res.json({ message: "CORS working!" });
});

app.listen(5000, () => {
  console.log("Server running");
});
```

---

# 🔐 Credentials (Cookies / Auth)

If you're sending cookies or tokens:

### Backend:

```js
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
```

### Frontend (Axios):

```js
axios.get("/api", {
  withCredentials: true
});
```

---

# ⚠️ Common Mistakes

## ❌ 1. Using `*` with credentials

```js
origin: "*"
credentials: true ❌ NOT allowed
```

---

## ❌ 2. Forgetting preflight handling

If CORS is not configured properly → PUT/DELETE fail

---

## ❌ 3. Backend not running

Sometimes it’s not CORS, just server not running 😅

---

## ❌ 4. Wrong port

Frontend calling wrong backend URL

---

# 🔄 Flow (React → Express with CORS)

1. React sends request (Axios)
2. Browser checks origin
3. Sends request with `Origin` header
4. Express responds with CORS headers
5. Browser allows or blocks response

---

# 💡 Quick Debug Tip

Open DevTools → Network tab → check:

* Request headers → `Origin`
* Response headers → `Access-Control-Allow-Origin`

---

# 🚀 Simple Summary

* CORS = browser security rule
* Happens when frontend & backend are different origins
* Fix it using `cors()` in Express
* Control access using `origin` option

---

