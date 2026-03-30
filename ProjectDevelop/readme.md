### when we create the empty folder which cannot be push to git as git only tracks the files but we need to do it based on our need so we need to create a .gitkeep file inside the folder we want to keep in the git 


### nodemon reloads the  server when any changes occurs in the files it is better to install as the dev dependencies 

### prettier not just vscode extensions we need a npm package . It is used because when we collaborate multiple user can use different standards like for ex. (two space four space, semicolon no semicolon. ) causing the conflict on the git merges so it makes the same standard for everyone . It can be installed as the dev dependencies. And we need a prettierrc file where we define the terms and standards. And add some file on .prettierignore as some files are neccessary to not to be altered 

# Model Link
https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj

# Link of the tutorial
https://github.com/hiteshchoudhary/chai-backend 


### While connecting to the db we must use the error handling and the async await as it may take some time 

# Try to avoid using the special charater in the mongodb uri as the name and password with the special charater might cause some issue



This is a **custom error class** in JavaScript, commonly used in backend apps (especially with Express) to standardize how errors are created and handled.

Let’s break it down clearly: **what it is, how it works, and why it's useful.**

---

# 🔹 1. What is this?

```js
class ApiError extends Error
```

You are **extending the built-in `Error` class**.

👉 This means:

* `ApiError` behaves like a normal JavaScript error
* BUT with extra custom properties

---

# 🔹 2. Constructor Breakdown

```js
constructor (
    statusCode,
    message="Something went wrong",
    errors =[],
    stack =""
)
```

### Parameters:

| Parameter    | Purpose                                     |
| ------------ | ------------------------------------------- |
| `statusCode` | HTTP status (e.g., 404, 500)                |
| `message`    | Human-readable error message                |
| `errors`     | Array of detailed errors (validation, etc.) |
| `stack`      | Custom stack trace (optional)               |

---

# 🔹 3. `super(message)`

```js
super(message)
```

👉 Calls the parent `Error` class constructor

Without this:
❌ `this.message` won’t work properly
❌ stack trace may break

So this is **mandatory when extending Error**

---

# 🔹 4. Custom Properties

```js
this.statusCode = statusCode
this.data = null
this.message = message
this.success = false
this.errors = errors
```

### Why these?

* `statusCode` → used in HTTP response
* `data = null` → keeps response format consistent
* `success = false` → standard API response structure
* `errors` → useful for validation errors (like from MongoDB)

👉 This creates a **uniform error response structure**

Example:

```json
{
  "success": false,
  "message": "Invalid input",
  "errors": ["email is required"]
}
```

---

# 🔹 5. Stack Trace Handling

```js
if(stack) {
    this.stack = stack
} else{
    Error.captureStackTrace(this, this.constructor)
}
```

### What is stack trace?

It shows:
👉 where the error happened in code

---

### Case 1: Custom stack provided

```js
this.stack = stack
```

Used when:

* re-throwing errors
* logging external errors

---

### Case 2: Default stack

```js
Error.captureStackTrace(this, this.constructor)
```

👉 This:

* removes constructor call from stack
* gives cleaner debugging

---

# 🔹 6. Why use this class?

## ❌ Without ApiError

```js
throw new Error("User not found")
```

Problems:

* No status code
* No structured response
* Hard to handle globally

---

## ✅ With ApiError

```js
throw new ApiError(404, "User not found")
```

Now you get:

```json
{
  "statusCode": 404,
  "message": "User not found",
  "success": false,
  "errors": []
}
```

---

# 🔹 7. How it's used in real backend

### Example in controller:

```js
if (!user) {
    throw new ApiError(404, "User not found")
}
```

---

### Global error middleware (Express):

```js
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: err.success || false,
        message: err.message,
        errors: err.errors || [],
    });
});
```

👉 This ensures:

* ALL errors follow same format
* Cleaner frontend handling

---

# 🔹 8. Why this pattern is important

### 🔸 1. Consistency

Every error looks the same

### 🔸 2. Debugging

Stack trace + structured info

### 🔸 3. Clean architecture

Separates:

* Error creation
* Error handling

### 🔸 4. Scalable

Used in production apps

---

# 🔹 9. Small improvements you can make

You can enhance it like:

```js
this.name = "ApiError"
```

👉 Helps identify error type

---

# 🔹 10. Final Mental Model

Think of `ApiError` as:

👉 **"A professional error object for APIs"**

Instead of throwing random errors, you throw:
✔ structured
✔ predictable
✔ HTTP-aware errors

---

# 🔥 Summary

* Extends built-in `Error`
* Adds API-specific fields (`statusCode`, `errors`, `success`)
* Ensures consistent backend responses
* Improves debugging with stack traces
* Used with global error middleware

---
Great — let’s build a **production-level error handling system** using your `ApiError`. This is exactly how clean Node.js/Express backends are structured.

We’ll cover:

1. ✅ `asyncHandler` (to avoid try/catch everywhere)
2. ✅ Global error middleware
3. ✅ Handling MongoDB/Mongoose errors
4. ✅ Final clean folder structure

---

# 🔹 1. asyncHandler (VERY IMPORTANT)

### ❌ Problem:

In Express, async errors are not caught automatically:

```js
app.get("/user", async (req, res) => {
    const user = await User.findById(id) // ❌ if fails → crash
})
```

---

## ✅ Solution: asyncHandler

```js
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

export { asyncHandler }
```

---

### 🔥 How it works:

* Wraps your async function
* If error occurs → sends it to `next()`
* Express global middleware catches it

---

### ✅ Usage:

```js
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    res.json({ success: true, data: user })
})
```

---

# 🔹 2. Global Error Middleware

This is the **heart of your error system**

```js
const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500
    let message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    })
}

export { errorMiddleware }
```

---

### ✅ Plug into Express:

```js
import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware.js"

const app = express()

// routes here

app.use(errorMiddleware) // ALWAYS LAST
```

---

# 🔹 3. Handling Mongoose / MongoDB Errors

When using **Mongoose**, errors come in different forms.

We normalize them into `ApiError`.

---

## 🔸 1. Invalid ObjectId

```js
import mongoose from "mongoose"

if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new ApiError(400, "Invalid ID")
}
```

---

## 🔸 2. Validation Error

Example:

```js
User.create({ email: "" }) // ❌
```

Handle inside middleware:

```js
if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(e => e.message)
    err = new ApiError(400, "Validation failed", errors)
}
```

---

## 🔸 3. Duplicate Key Error

MongoDB duplicate field:

```js
if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ")
    err = new ApiError(400, `${field} already exists`)
}
```

---

## 🔥 Final improved middleware

```js
const errorMiddleware = (err, req, res, next) => {

    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(e => e.message)
        err = new ApiError(400, "Validation failed", errors)
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue).join(", ")
        err = new ApiError(400, `${field} already exists`)
    }

    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    })
}
```

---

# 🔹 4. Clean Folder Structure

```
src/
│
├── utils/
│   ├── ApiError.js
│   ├── asyncHandler.js
│
├── middlewares/
│   └── error.middleware.js
│
├── controllers/
│   └── user.controller.js
│
├── models/
│   └── user.model.js
│
├── routes/
│   └── user.routes.js
│
└── app.js
```

---

# 🔹 5. Full Flow (IMPORTANT)

### 🔁 Request lifecycle:

1. Route hit
2. Controller runs via `asyncHandler`
3. Error thrown → `next(err)`
4. Global middleware catches it
5. Sends structured JSON response

---

# 🔹 6. Pro Tips (Production Level)

### ✅ Add error types

```js
this.name = "ApiError"
```

---

### ✅ Hide stack in production

```js
process.env.NODE_ENV === "production"
```

---

### ✅ Standard response format

Always return:

```json
{
  "success": false,
  "message": "...",
  "errors": []
}
```

---

# 🔥 Final Understanding

You now have:

✔ Centralized error handling
✔ No repetitive try/catch
✔ Clean controllers
✔ Scalable backend architecture

---


