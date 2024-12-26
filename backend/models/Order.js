const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;