Mongoose **middlewares (also called hooks)** are functions that run **before or after certain operations** on your MongoDB documents.

They’re extremely useful for things like:

* Hashing passwords (bcrypt 🔐)
* Logging
* Validation
* Auto-updating fields

https://mongoosejs.com/docs/middleware.html

---

# 🧠 What are Mongoose Middlewares?

In Mongoose, middleware lets you hook into the lifecycle of operations like:

* `save()`
* `validate()`
* `find()`
* `update()`
* `remove()`

---

# ⚙️ Types of Middleware

## 1. Document Middleware

Runs on individual documents

👉 Example:

* `save`
* `validate`
* `remove`

---

## 2. Query Middleware

Runs on queries

👉 Example:

* `find`
* `findOne`
* `updateOne`

---

## 3. Model Middleware

Runs on static model methods

👉 Example:

* `insertMany`

---

## 4. Aggregate Middleware

Runs on aggregation pipelines

👉 Example:

* `aggregate`

---

# 🔁 Pre vs Post Middleware

## 🔹 Pre Middleware (`pre`)

Runs **before** the operation

```js
schema.pre("save", function (next) {
    console.log("Before saving");
    next();
});
```

---

## 🔹 Post Middleware (`post`)

Runs **after** the operation

```js
schema.post("save", function (doc) {
    console.log("After saving", doc);
});
```

---

# 🔐 Real Example: Hash Password with bcrypt

This is the **most important real-world use case** 👇

```js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});
```

---

## 🧠 Why this works

* Runs before `.save()`
* Automatically hashes password
* Avoids hashing again if not modified

---

# ⚠️ Important: `this` keyword

### In document middleware:

```js
this.password
```

👉 Refers to the **document**

---

### In query middleware:

```js
this.getQuery()
```

👉 Refers to the **query**

---

# 🔍 Query Middleware Example

```js
userSchema.pre("find", function (next) {
    console.log("Find query running");
    next();
});
```

---

# ⚠️ Common Confusion (Very Important)

## ❌ `save` middleware does NOT run on update

```js
User.updateOne({ _id }, { password: "123" });
```

👉 ❌ Will NOT trigger `pre("save")`

---

## ✅ Fix: Use `pre("updateOne")`

```js
userSchema.pre("updateOne", async function (next) {
    const update = this.getUpdate();

    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
    }

    next();
});
```

---

# 🧩 Post Middleware Example

```js
userSchema.post("save", function (doc) {
    console.log("User saved:", doc.email);
});
```

---

# 🚀 Common Use Cases

### 🔐 1. Password hashing

(using bcrypt)

---

### 📅 2. Timestamps

```js
schema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});
```

---

### 🧹 3. Soft delete filter

```js
schema.pre("find", function () {
    this.where({ isDeleted: false });
});
```

---

### 📊 4. Logging queries

```js
schema.pre("find", function () {
    console.log(this.getQuery());
});
```

---

# ⚠️ Common Mistakes

### ❌ Using arrow functions

```js
schema.pre("save", () => {
    console.log(this); // ❌ undefined
});
```

👉 Always use:

```js
function () {}
```

---

### ❌ Forgetting `next()`

Middleware will hang

---

### ❌ Hashing every time

Fix:

```js
if (!this.isModified("password")) return next();
```

---

# 🔄 Execution Order

Multiple middlewares run **in order defined**:

```js
schema.pre("save", fn1);
schema.pre("save", fn2);
```

👉 Order:

1. fn1
2. fn2

---

# 🧠 Interview Tip

👉 Question:

> Difference between document and query middleware?

Answer:

> Document middleware operates on individual documents (`this` = document), while query middleware operates on queries (`this` = query object).

---

# ⚡ Pro Tips

* Use `pre("save")` for logic tied to document creation
* Use `pre("find")` for global filters
* Use `pre("updateOne")` for updates
* Combine with JWT + bcrypt for full auth system

---

