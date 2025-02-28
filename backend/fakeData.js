const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

function generateFakeExpenses(numExpenses) {
  const categories = [
    "Food",
    "Transportation",
    "Housing",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Travel",
    "Health",
    "Education",
    "Income",
    "Other",
  ];
  const expenses = [];
  const twoMonthsAgo = new Date();
  console.log(twoMonthsAgo);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  const today = new Date();

  for (let i = 0; i < numExpenses; i++) {
    const amount = Math.floor(Math.random() * 500) + 200;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const randomDate = new Date(
      twoMonthsAgo.getTime() +
        Math.random() * (today.getTime() - twoMonthsAgo.getTime())
    );

    expenses.push({
      amount: amount,
      category: category,
      date: randomDate,
    });
  }

  return expenses;
}

const fakeExpenses = generateFakeExpenses(60);

async function insertExpenses(expenses) {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/tracker");
    await Expense.insertMany(expenses);
    console.log("Expenses inserted successfully.");
  } catch (error) {
    console.error("Error inserting expenses:", error);
  } finally {
    mongoose.disconnect();
  }
}

insertExpenses(fakeExpenses);