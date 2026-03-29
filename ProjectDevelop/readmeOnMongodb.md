# Try to avoid using the special charater in the mongodb uri as the name and password with the special charater might cause some issue
Yeah, this is a very common issue with **MongoDB connection strings** — special characters in passwords break the URI because they have reserved meanings.

---

## 🔴 Why it breaks

MongoDB URI looks like:

```
mongodb+srv://username:password@cluster.mongodb.net/dbname
```

But if your password contains characters like:

```
@ / : ? # [ ] % $
```

they interfere with parsing the URL.

Example (❌ broken):

```
mongodb+srv://user:pa@ss#123@cluster.mongodb.net/test
```

MongoDB thinks:

* `pa` = password
* `@ss#123@cluster` = host ❌ wrong

---

## ✅ Solution: URL Encode the Password

You need to **encode special characters** using URL encoding.

### Example conversions:

| Character | Encode |
| --------- | ------ |
| @         | %40    |
| #         | %23    |
| /         | %2F    |
| :         | %3A    |
| ?         | %3F    |
| %         | %25    |

---

### 🔧 Example Fix

Original password:

```
pa@ss#123
```

Encoded:

```
pa%40ss%23123
```

Final connection string:

```
mongodb+srv://user:pa%40ss%23123@cluster.mongodb.net/test
```

---

## ⚡ Easy way (recommended)

### In Node.js:

```js
encodeURIComponent("pa@ss#123")
```

Output:

```
pa%40ss%23123
```

---

## 💡 Pro Tip (Best Practice)

Instead of hardcoding:

```js
const uri = "mongodb+srv://user:password@cluster...";
```

Use `.env`:

```env
MONGO_PASSWORD=pa@ss#123
```

Then in code:

```js
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

const uri = `mongodb+srv://user:${password}@cluster.mongodb.net/test`;
```

---

## ⚠️ Common mistakes

* ❌ Encoding entire URI → only encode password
* ❌ Forgetting `%` encoding → still breaks
* ❌ Copy-paste raw password from MongoDB Atlas without checking characters

---

## 🚀 Alternative (cleaner)

You can also use MongoDB URI options:

```
mongodb+srv://user@cluster.mongodb.net/test?authSource=admin
```

Then pass password separately in driver config (depends on driver).

---
