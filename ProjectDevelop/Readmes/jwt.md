JWT (**JSON Web Token**) is the backbone of modern authentication systems—especially in APIs (like your Express + MongoDB setup).


https://www.jwt.io/

https://github.com/auth0/node-jsonwebtoken

---

# 🔐 What is JWT?

A **JWT (JSON Web Token)** is a **secure way to transmit information** between client and server.

👉 Most commonly used for:

* Authentication (login systems)
* Authorization (protecting routes)

---

# 🧠 Simple Idea

Instead of storing sessions on the server:

👉 Server gives client a **token** after login
👉 Client sends token with every request
👉 Server verifies token → allows access

---

# 📦 Structure of JWT

A JWT looks like this:

```
xxxxx.yyyyy.zzzzz
```

It has **3 parts**:

---

## 1. Header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

* Algorithm used for signing
* Type of token

---

## 2. Payload (Data)

```json
{
  "userId": "12345",
  "email": "test@example.com",
  "exp": 1716239022
}
```

👉 Contains:

* User info (not sensitive!)
* Expiration time

---

## 3. Signature

Created using:

```
Header + Payload + Secret Key
```

👉 Ensures token is **not tampered**

---

# ⚙️ How JWT Works (Flow)

### 🔁 Authentication Flow:

1. User logs in
2. Server verifies credentials
3. Server generates JWT
4. Client stores JWT (localStorage / cookie)
5. Client sends JWT in request headers
6. Server verifies JWT → grants access

---

# 📦 Install JWT (Node.js)

```bash
npm install jsonwebtoken
```

---

# 🧪 Basic Usage

## 1. Generate Token

```js
import jwt from "jsonwebtoken";

const token = jwt.sign(
  { userId: user._id },   // payload
  process.env.JWT_SECRET, // secret key
  { expiresIn: "1h" }     // expiry
);

console.log(token);
```

---

## 2. Verify Token (Middleware)

```js
import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
```

---

## 3. Protect Route

```js
app.get("/profile", verifyJWT, (req, res) => {
    res.json({ message: "Protected route", user: req.user });
});
```

---

# 🔑 Where to Store JWT?

### ✅ Options:

| Storage                 | Pros        | Cons              |
| ----------------------- | ----------- | ----------------- |
| localStorage            | Easy        | Vulnerable to XSS |
| cookies (httpOnly)      | More secure | Slightly complex  |
| memory (frontend state) | safest      | lost on refresh   |

👉 Best practice: **httpOnly cookies**

---

# ⚠️ Important Security Rules

### ❌ Don't store sensitive data in payload

Payload is **not encrypted**, just encoded

---

### ❌ Don't use weak secret key

```env
JWT_SECRET = "mysupersecretkey123!"
```

---

### ✅ Use expiration

```js
{ expiresIn: "1h" }
```

---

### ✅ Use HTTPS

Prevent token interception

---

# 🔄 JWT + bcrypt (Real Auth Flow)

### 🔐 Register:

* Hash password using `bcrypt`
* Store in DB

### 🔑 Login:

* Compare password (`bcrypt.compare`)
* If valid → generate JWT

---

# 🧩 Full Example (Login)

```js
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});
```

---

# 🆚 JWT vs Sessions

| Feature     | JWT    | Sessions |
| ----------- | ------ | -------- |
| Storage     | Client | Server   |
| Scalability | High   | Limited  |
| Stateless   | ✅      | ❌        |
| Revocation  | Hard   | Easy     |

---

# 🚀 Types of JWT

### 1. Access Token

* Short-lived (15m–1h)
* Used for API requests

---

### 2. Refresh Token

* Long-lived
* Used to generate new access tokens

---

# 🧠 Interview Tip

👉 If asked:

> Why JWT?

Answer:

> JWT enables stateless authentication, improves scalability, and avoids server-side session storage.

---

# ⚡ Common Mistakes

* Not verifying token
* No expiration
* Storing in localStorage without protection
* Hardcoding secret key
* Not handling token expiry

---
