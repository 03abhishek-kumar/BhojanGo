const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserLocation,
} = require("../controllers/userController");

router.get("/:uid", getUserProfile);
router.post("/location", updateUserLocation);

module.exports = router;
