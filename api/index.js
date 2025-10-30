const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express running on Vercel!" });
});

module.exports = app;
module.exports.handler = serverless(app);


// --- In-memory "database" ---
const products = [
  {
    id: "pb-10000",
    name: "PowerMax 10,000 mAh",
    price: 29.99,
    rating: 4.6,
    img: "https://www.kaze.ph/images/front-and-back.webp",
    description:
      "Slim 10,000 mAh powerbank with fast USB-A/USB-C output and LED indicators.",
  },
  {
    id: "pb-20000",
    name: "PowerMax 20,000 mAh",
    price: 49.99,
    rating: 4.8,
    img: "/powerbank-20000.png",
    description:
      "High-capacity 20,000 mAh with PD 20W USB-C fast charge and dual USB-A.",
  },
  {
    id: "pb-mag-5000",
    name: "MagCharge 5,000 mAh (MagSafe)",
    price: 39.99,
    rating: 4.5,
    img: "https://www.kaze.ph/images/Screenshot-2025-10-23-at-13.17.43.png",
    description:
      "Snap-on magnetic 5,000 mAh for iPhone with pass-through charging.",
  },
];


app.get("/api/products", (req, res) => {
  res.json(products);
});


app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});