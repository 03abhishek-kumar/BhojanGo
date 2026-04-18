const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  badge: String,
  badgeColor: String,
  image: String,
  category: { type: String, required: true },
});

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: String,
  rating: { type: Number, default: 0 },
  time: String,
  fee: String,
  badge: String,
  badgeColor: String,
  status: String,
  statusColor: String,
  dotColor: String,
  statusBoxColor: String,
  statusRight: String,
  image: String,
  menu: [MenuItemSchema], // Embedding menu items for simplicity in this case
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
