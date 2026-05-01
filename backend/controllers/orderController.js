const Order = require("../models/Order");

//   Place an order

const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  Fetch orders for a specific user

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.uid }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
};
