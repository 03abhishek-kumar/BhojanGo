const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
} = require("../controllers/restaurantController");

router.get("/", getAllRestaurants);
router.post("/", createRestaurant);
router.get("/:id", getRestaurantById);

module.exports = router;
