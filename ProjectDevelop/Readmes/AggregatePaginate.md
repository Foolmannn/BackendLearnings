`mongoose-aggregate-paginate-v2` is a **Mongoose plugin** that makes it easy to **paginate aggregation pipelines** (not just simple `.find()` queries).

👉 If you're using MongoDB aggregation (`$match`, `$lookup`, `$group`, etc.), this plugin is 🔥 useful.

---

# 🧠 What problem does it solve?

Normal pagination:

```js
Model.find().skip().limit()
```

❌ Doesn't work well with:

* `$lookup`
* `$group`
* `$project`

👉 Aggregation pipelines need a different approach.

---

# 📦 What is `mongoose-aggregate-paginate-v2`?

A plugin for Mongoose that adds:

```js
Model.aggregatePaginate(aggregateQuery, options)
```

---

# 📦 Installation

```bash
npm install mongoose-aggregate-paginate-v2
```

---

# ⚙️ Setup

```js
import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const schema = new mongoose.Schema({
    name: String,
    price: Number
});

// apply plugin
schema.plugin(aggregatePaginate);

const Product = mongoose.model("Product", schema);
```

---

# 🧪 Basic Usage

## Step 1: Create aggregation

```js
const aggregate = Product.aggregate([
    { $match: { price: { $gt: 100 } } }
]);
```

---

## Step 2: Paginate it

```js
const options = {
    page: 1,
    limit: 10
};

const result = await Product.aggregatePaginate(aggregate, options);
```

---

# 📊 Output Format

```js
{
  docs: [...],          // actual data
  totalDocs: 100,
  limit: 10,
  page: 1,
  totalPages: 10,
  hasNextPage: true,
  hasPrevPage: false,
  nextPage: 2,
  prevPage: null
}
```

---

# 🔍 Real Example (with `$lookup`)

```js
const aggregate = Order.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails"
        }
    },
    { $unwind: "$userDetails" }
]);

const result = await Order.aggregatePaginate(aggregate, {
    page: 1,
    limit: 5
});
```

---

# ⚙️ Options

| Option         | Description    |
| -------------- | -------------- |
| `page`         | Current page   |
| `limit`        | Docs per page  |
| `sort`         | Sorting        |
| `customLabels` | Rename fields  |
| `allowDiskUse` | For large data |

---

## Example with sort

```js
const result = await Product.aggregatePaginate(aggregate, {
    page: 1,
    limit: 10,
    sort: { price: -1 }
});
```

---

# 🏷️ Custom Labels

```js
const options = {
    page: 1,
    limit: 10,
    customLabels: {
        docs: "items",
        totalDocs: "totalItems"
    }
};
```

---

# ⚠️ Important Notes

### 🔸 You MUST apply plugin

```js
schema.plugin(aggregatePaginate);
```

---

### 🔸 Use `aggregate()` not `find()`

```js
Product.aggregate([...])
```

---

### 🔸 Works only with aggregation pipelines

---

# 🚀 When to Use It

Use this plugin when:

✅ You use:

* `$lookup` (joins)
* `$group` (analytics)
* `$facet`
* Complex pipelines

❌ Avoid if:

* Simple queries → use `mongoose-paginate-v2`

---

# 🆚 aggregate-paginate vs paginate

| Feature              | aggregate-paginate | paginate |
| -------------------- | ------------------ | -------- |
| Works with `$lookup` | ✅                  | ❌        |
| Works with `$group`  | ✅                  | ❌        |
| Simple queries       | ⚠️                 | ✅        |
| Performance          | Slightly heavier   | Faster   |

---

# 🔥 Pro Pattern (Production)

Combine:

* Filters
* Search
* Sorting
* Pagination

```js
const aggregate = Product.aggregate([
    {
        $match: {
            name: { $regex: search, $options: "i" }
        }
    },
    {
        $sort: { createdAt: -1 }
    }
]);

const result = await Product.aggregatePaginate(aggregate, {
    page,
    limit
});
```

---

# ⚠️ Common Mistakes

❌ Forgetting plugin
❌ Using `.find()` instead of `.aggregate()`
❌ Not handling empty results
❌ Large pipelines without `allowDiskUse`

---

# 🧠 Interview Tip

👉 Question:

> Why use aggregate pagination?

Answer:

> Because normal pagination doesn’t work efficiently with aggregation pipelines like `$lookup` and `$group`, so this plugin provides structured pagination for those complex queries.

---

# ⚡ Bonus Tip

For large datasets:

```js
{
  allowDiskUse: true
}
```

---

