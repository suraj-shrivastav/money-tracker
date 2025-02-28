// server.js (backend)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Expense = require("./models/expense");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log("Listening on port: ", port);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/tracker")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/expense", async (req, res) => {
  try {
    const data = await Expense.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message }); // Send error status and message
  }
});

app.post("/expense", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Missing data" }); // Send 400 for bad request
    }
    const newExpense = new Expense({
      amount: parseInt(req.body.amount),
      category: req.body.category,
      date: req.body.date,
    });

    const savedData = await newExpense.save();
    console.log(savedData);
    res.status(201).json(savedData); // Send 201 for created
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // Send error status and message
  }
});

app.delete("/expense/:id", async (req, res) => {
  try {
    const data = await Expense.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Expense not found" }); // send 404 if not found
    }
    console.log("Deleted data: ", data);
    res.json({ message: "Expense deleted", deletedExpense: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/expense/:id", async (req, res) => {
  try {
    const data = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});