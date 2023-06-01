const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const express = require("express");
const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://NurgulYunusova:KlSyNX3ocRNqLMtQ@cluster0.ghrat3c.mongodb.net/introMongoDB"
);

//table - collections

//product adında bir collection design ettim
let productSchema = new Schema({
  name: String,
  unitPrice: Number,
  unitsInStock: Number,
  addDate: {
    type: Date,
    default: Date.now,
  },
});

// user adında bir collection design ettim
// let userSchema = new Schema({
//   name: String,
//   surname: String,
//   email: String,
// });

//bu dizaynı mongoya haber verdim.
let Product = mongoose.model("Product", productSchema);
// let User = mongoose.model("User", userSchema);

//Get All
app.get("/api/products", (req, res) => {
  Product.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Add
app.post("/api/products", (req, res) => {
  let product = new Product({
    name: req.body.name,
    unitPrice: req.body.unitPrice,
    unitsInStock: req.body.unitsInStock,
  });

  product.save();

  res.json(product);
});

//Get By Id
app.get("/api/products/:id", (req, res) => {
  let id = req.params.id;

  Product.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Delete
app.delete("/api/products/:id", (req, res) => {
  let id = req.params.id;

  Product.findByIdAndRemove(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Update
app.put("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  Product.findByIdAndUpdate(productId, updatedProduct, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update product" });
    });
});

app.listen(3300, () => {
  console.log("Express is running...");
});
