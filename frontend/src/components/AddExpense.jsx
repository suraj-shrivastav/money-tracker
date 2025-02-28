import React, { useContext } from 'react';
import { Context } from '../context/context';

function AddExpense() {
  const {
    amount,
    setAmount,
    category,
    setCategory,
    date,
    setDate,
    allCategories,
    handleAddExpense,
  } = useContext(Context);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Expense</h2>
      
      <form onSubmit={handleAddExpense} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            min={0}
            required
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter amount"
          />
        </div>
        
        <div className="space-y-2"> 
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select a category</option>
            {allCategories.map((expCat) => (
              <option key={expCat} value={expCat}>
                {expCat}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e ? e.target.value : Date.now)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpense;