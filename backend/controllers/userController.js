const User = require("../models/User");

//  Get user profile (including location)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user location
const updateUserLocation = async (req, res) => {
  const { uid, location, name, email } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { location, name, email },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserLocation,
};
