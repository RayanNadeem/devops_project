const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://mongodb:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const Order = require("./models/Order");
const Contact = require("./models/Contact");

app.post("/api/checkout", async (req, res) => {
  try {
    const { name, email, address, city = "N/A", zip = "N/A", items, totalAmount } = req.body;

    if (!name || !email || !address || !items || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      name,
      email,
      address,
      city,
      zip,
      items,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "An error occurred while placing the order." });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please provide name, email, and message." });
    }

    const newContactMessage = new Contact({
      name,
      email,
      message,
    });

    await newContactMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "An error occurred while sending the message." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});