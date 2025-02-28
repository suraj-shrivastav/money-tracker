import React, { useContext } from 'react';
import { Context } from '../context/context';

const Statement = () => {
    const {
        expenses,
        handleEdit,
        handleDelete,
    } = useContext(Context);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Expenses</h2>

            {expenses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No expenses to display. Add an expense to get started.
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {expenses.map((expense) => (
                        <li key={expense._id} className="py-4 hover:bg-gray-50">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                                            {expense.category}
                                        </span>
                                        <span className="text-lg font-semibold">
                                            ${expense.amount.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500">
                                        <div className="flex items-center mr-6">
                                            <span>{new Date(expense.date).toLocaleDateString()}</span>
                                        </div>

                                        {expense.note && (
                                            <div className="flex items-center mt-1 sm:mt-0">
                                                <span>{expense.note}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center mt-3 md:mt-0 space-x-2">
                                    {/* <button 
                                        onClick={() => handleEdit(expense)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Edit
                                    </button> */}
                                    <button 
                                        onClick={() => handleDelete(expense._id)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {expenses.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Total Expenses:</span>
                        <span className="text-xl font-bold">${expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statement;
