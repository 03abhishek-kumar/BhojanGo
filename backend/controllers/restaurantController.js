const Restaurant = require("../models/Restaurant");

//  Fetch all restaurants

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().select("-menu");
    res.json(restaurants);
  } catch (err) {
    console.error("Error in GET /api/restaurants:", err);
    res.status(500).json({ error: "Failed to fetch restaurants", details: err.message });
  }
};

//  Fetch a single restaurant (including menu)
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
};
