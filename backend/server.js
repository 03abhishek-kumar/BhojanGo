const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Restaurant = require("./models/Restaurant");
const Order = require("./models/Order");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB is Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error Details:", err);
  });

// ── API ROUTES ──

// Fetch all restaurants
app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error("Error in GET /api/restaurants:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch restaurants", details: err.message });
  }
});

// Fetch a single restaurant (including menu)
app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Place an order
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch orders for a specific user
app.get("/api/orders/user/:uid", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.uid }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ── USER ROUTES ──

// Get user profile (including location)
app.get("/api/users/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user location
app.post("/api/users/location", async (req, res) => {
  const { uid, location, name, email } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { location, name, email },
      { new: true, upsert: true },
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
