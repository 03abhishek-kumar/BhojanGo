const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Route imports
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("BhojanGo API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
