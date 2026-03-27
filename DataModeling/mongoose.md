
---

# 🟢 What is Mongoose?

👉 Mongoose is an **ODM (Object Data Modeling) library** for MongoDB in Node.js.

It helps you:

* Define **schemas**
* Enforce **structure & validation**
* Work with MongoDB using **JavaScript objects**

---

# 🧠 Why Use Mongoose?

Without Mongoose:

```js
db.collection.insertOne({ name: "Suman" });
```

With Mongoose:

```js
User.create({ name: "Suman" });
```

✅ Benefits:

* Schema validation
* Cleaner code
* Middleware (hooks)
* Built-in methods
* Relationships support

---

# ⚙️ Installation & Setup

```bash
npm install mongoose
```

### Connect to MongoDB

```js
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));
```

---

# 📦 Core Concepts of Mongoose

---

## 1. Schema

A **schema** defines structure of your data.

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
```

👉 This is like a blueprint

---

## 2. Model

A **model** is used to interact with the database.

```js
const User = mongoose.model("User", userSchema);
```

👉 Now `User` = collection handler

---

## 3. Document

A **document** is an instance of a model.

```js
const user = new User({
  name: "Suman",
  email: "suman@mail.com"
});
```

---

# 🔄 CRUD Operations

---

## 🟢 Create

```js
await User.create({
  name: "Suman",
  email: "suman@mail.com"
});
```

---

## 🔵 Read

```js
const users = await User.find();
const user = await User.findById(id);
```

---

## 🟡 Update

```js
await User.findByIdAndUpdate(id, {
  name: "Updated Name"
});
```

---

## 🔴 Delete

```js
await User.findByIdAndDelete(id);
```

---

# 🧩 Schema Types & Options

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true
  },
  age: {
    type: Number,
    min: 18
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

---

# ✅ Validation

Mongoose provides built-in validation:

```js
email: {
  type: String,
  required: true,
  match: /.+\@.+\..+/
}
```

Custom validation:

```js
age: {
  type: Number,
  validate: {
    validator: v => v >= 18,
    message: "Age must be 18+"
  }
}
```

---

# 🔗 Relationships in Mongoose

---

## 1. Referencing (like SQL foreign key)

```js
const postSchema = new mongoose.Schema({
  title: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
```

### Populate (JOIN-like)

```js
const posts = await Post.find().populate("user");
```

👉 This fetches related user data

---

## 2. Embedding (MongoDB style)

```js
const userSchema = new mongoose.Schema({
  name: String,
  posts: [
    {
      title: String,
      content: String
    }
  ]
});
```

---

# 🔁 Middleware (Hooks)

Run logic before/after operations.

```js
userSchema.pre("save", function(next) {
  console.log("Before saving");
  next();
});
```

```js
userSchema.post("save", function(doc) {
  console.log("Saved:", doc);
});
```

---

# 🔍 Query Methods

```js
User.find({ age: { $gt: 18 } });
User.findOne({ email: "test@mail.com" });
User.countDocuments();
```

---

# ⚡ Indexing

Improves performance:

```js
userSchema.index({ email: 1 });
```

---

# 🧠 Virtuals

Fields that are not stored in DB:

```js
userSchema.virtual("fullInfo").get(function() {
  return `${this.name} (${this.email})`;
});
```

---

# 🔒 Timestamps

```js
const schema = new mongoose.Schema({
  name: String
}, { timestamps: true });
```

👉 Adds:

* createdAt
* updatedAt

---

# 📁 Folder Structure (Best Practice)

For your Express app:

```
models/
  User.js
  Todo.js

controllers/
routes/
```

Example:

```js
// models/User.js
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String
});

export default mongoose.model("User", schema);
```

---

# 🚀 Real Example (Todo App)

```js
const todoSchema = new mongoose.Schema({
  text: String,
  isCompleted: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model("Todo", todoSchema);
```

---

# ⚠️ Common Mistakes

❌ Not using `await`
❌ Not handling errors
❌ Overusing embedding
❌ Ignoring validation

---

# 🟣 SQL vs Mongoose Mindset

| SQL             | Mongoose          |
| --------------- | ----------------- |
| Table           | Collection        |
| Row             | Document          |
| Schema (strict) | Schema (flexible) |
| JOIN            | populate()        |

---

# 🧾 Final Summary

👉 Mongoose is:

* A **bridge between Node.js and MongoDB**
* Used to **structure and validate data**
* Makes database operations **clean and powerful**

---

