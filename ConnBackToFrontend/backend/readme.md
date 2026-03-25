If `process.env.PORT` is coming as `undefined`, it usually means the environment variable **PORT is not set**. Here are the common causes and fixes:

---

## 🔍 1. You didn’t define the PORT

Node.js does **not automatically create `PORT`** unless you're on platforms like Heroku, Vercel, etc.

### ✅ Fix:

Set it manually:

### In terminal:

```bash
PORT=5000 node index.js
```

### Or on Windows (cmd):

```bash
set PORT=5000 && node index.js
```

---

## 🔍 2. You are using a `.env` file but not loading it

If you wrote:

```
PORT=5000
```

in a `.env` file, Node won’t read it automatically.

### ✅ Fix:

Install and use dotenv:

```bash
npm install dotenv
```

Then at the **top of your main file**:

```js
import dotenv from "dotenv";
dotenv.config();
```

(or `require('dotenv').config();` for CommonJS)

---

## 🔍 3. Typo or wrong variable name

Make sure:

```
PORT=5000
```

not:

```
port=5000   ❌
```

Environment variables are **case-sensitive**.

---

## 🔍 4. Using fallback is best practice

Even if PORT is missing, your app shouldn’t break.

### ✅ Do this:

```js
const port = process.env.PORT || 3000;
```

---

## 🔍 5. Running with tools (like nodemon)

Sometimes environment variables are not passed correctly.

### ✅ Fix:

```bash
PORT=5000 nodemon index.js
```

---

## 💡 Quick Debug Tip

Add:

```js
console.log(process.env);
```

to see all environment variables.

---

## 🚀 Summary

`process.env.PORT` is undefined because:

* You didn’t set it
* `.env` isn’t loaded
* Wrong naming
* Running environment doesn’t provide it

---

