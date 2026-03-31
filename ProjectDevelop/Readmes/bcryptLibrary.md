**`bcrypt`** is one of the most widely used libraries for **secure password hashing** in backend development (especially in Node.js, Python, etc.). If you're building authentication (like in your Express/MongoDB project), this is *essential*.


https://www.npmjs.com/package/bcrypt

---

# 🔐 What is `bcrypt`?

`bcrypt` is a **hashing algorithm** designed specifically for passwords. It converts a plain password into a **hashed string** that is:

* One-way (cannot be reversed)
* Slow (to prevent brute-force attacks)
* Salted (adds randomness for security)

---

# ⚙️ Why not store plain passwords?

❌ Bad:

```js
password = "mypassword123"
```

If DB leaks → all users compromised

✅ Good (bcrypt):

```js
password = "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36..."
```

Even if DB leaks → attacker cannot easily recover original password

---

# 🧠 Core Concepts

## 1. Hashing

Turning password into unreadable string:

```
mypassword → hashed_value
```

---

## 2. Salt

A **random value added** before hashing.

👉 Prevents:

* Rainbow table attacks
* Same passwords having same hash

---

## 3. Cost Factor (Salt Rounds)

Controls how **slow** hashing is.

Example:

```js
bcrypt.hash(password, 10)
```

* `10` = salt rounds
* Higher = more secure but slower

---

# 📦 Installing bcrypt (Node.js)

```bash
npm install bcrypt
```

---

# 🧪 Basic Usage (Node.js)

## 1. Hashing Password

```js
import bcrypt from "bcrypt";

const password = "mypassword123";

const hashedPassword = await bcrypt.hash(password, 10);

console.log(hashedPassword);
```

---

## 2. Comparing Password (Login)

```js
const isMatch = await bcrypt.compare("mypassword123", hashedPassword);

if (isMatch) {
    console.log("Login success");
} else {
    console.log("Invalid password");
}
```

👉 Important:

* You **never decrypt**
* You only **compare**

---

# 🔄 Internal Working (Simplified)

### Step-by-step:

1. Generate salt
2. Combine password + salt
3. Apply hashing algorithm multiple times
4. Store result

---

# 🧾 Structure of bcrypt Hash

Example:

```
$2b$10$KYVbZ5JFVfqu0oV98LnF5eTk4QTe2e4PQG7QNYfhumEpGdi/867AO
```

Breakdown:

| Part          | Meaning           |
| ------------- | ----------------- |
| `$2b$`        | Algorithm version |
| `10`          | Cost factor       |
| Next 22 chars | Salt              |
| Remaining     | Hashed password   |

---

# ⚡ Why bcrypt is secure

### ✅ Adaptive

You can increase cost factor as computers get faster

### ✅ Salt included

No need to manage salt separately

### ✅ Resistant to brute-force

Because it's intentionally slow

---

# ⚠️ Common Mistakes

### ❌ 1. Storing plain password

Never do this

---

### ❌ 2. Hashing twice unnecessarily

```js
bcrypt.hash(bcrypt.hash(password))
```

❌ Wrong

---

### ❌ 3. Comparing manually

```js
if (password === hashedPassword)
```

❌ Wrong → always use `bcrypt.compare()`

---

# 🚀 Best Practices

* Use **salt rounds = 10–12** (good balance)
* Always hash before saving user
* Use async version (avoid blocking server)
* Combine with:

  * JWT authentication
  * HTTPS
  * Rate limiting

---

# 🧩 Example in Express (Real-world)

```js
// Register
app.post("/register", async (req, res) => {
    const { password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    // save hashed password to DB
});

// Login
app.post("/login", async (req, res) => {
    const { password } = req.body;

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login success" });
});
```

---

# 🆚 bcrypt vs other methods

| Method | Secure? | Reason             |
| ------ | ------- | ------------------ |
| MD5    | ❌       | Too fast, broken   |
| SHA256 | ⚠️      | Fast → vulnerable  |
| bcrypt | ✅       | Slow + salted      |
| argon2 | 🔥 Best | Modern alternative |

---

# 🧠 Pro Tip (Important for interviews)

👉 If asked:

> Why bcrypt instead of SHA?

Answer:

> Because bcrypt is intentionally slow and includes salting, making it resistant to brute-force and rainbow table attacks.

---

