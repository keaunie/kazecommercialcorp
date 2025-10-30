const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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

// --- API Routes ---
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

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

app.post("/api/checkout", (req, res) => {
  const { items, email } = req.body || {};
  if (!Array.isArray(items) || !email) {
    return res.status(400).json({ error: "Missing items or email" });
  }
  return res.json({
    success: true,
    orderId: "ORDER-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    message: "Demo checkout complete. No real charge made.",
  });
});

// --- Serve client build only when running locally ---
if (!process.env.VERCEL) {
  const clientDist = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    try {
      res.sendFile(path.join(clientDist, "index.html"));
    } catch (e) {
      res.status(404).send("Not Found");
    }
  });
}

// --- Export for Vercel ---
module.exports = app;
module.exports.handler = serverless(app);
