import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Context = createContext();

const ContextProvider = (props) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [editExpenseId, setEditExpenseId] = useState(null);
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [categoryWiseData, setCategoryWiseData] = useState({});
    const [recentDaysExpenses, setRecentDaysExpenses] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const allCategories = [
        'Food',
        'Transportation',
        'Housing',
        'Utilities',
        'Entertainment',
        'Shopping',
        'Travel',
        'Health',
        'Education',
        'Income',
        'Other',
    ];

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/expense');
            setExpenses(response.data);
            console.log('Fetched expenses:', response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleAddExpense = async (e) => {
        e.preventDefault();
        if (isNaN(parseFloat(amount))) {
            console.error('Invalid amount');
            return;
        }

        try {
            const dateToSend = date || new Date().toISOString().split('T')[0];
            if (editExpenseId) {
                const response = await axios.put(`http://localhost:3000/expense/${editExpenseId}`, {
                    amount,
                    category,
                    date: dateToSend,
                });
                setExpenses(expenses.map((expense) => (expense._id === editExpenseId ? response.data : expense)));
                setEditExpenseId(null);
            } else {
                const response = await axios.post('http://localhost:3000/expense', {
                    amount,
                    category,
                    date: dateToSend,
                });
                setExpenses([...expenses, response.data]);
            }
            setAmount('');
            setCategory('');
            setDate('');
            setShowAddPanel(false);
        } catch (error) {
            console.error('Error adding/updating expense:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/expense/${id}`);
            setExpenses(expenses.filter((expense) => expense._id !== id));
            console.log('Expense deleted:', id);
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const handleEdit = (expense) => {
        setAmount(expense.amount);
        setCategory(expense.category);
        setDate(new Date(expense.date).toISOString().split('T')[0]);
        setEditExpenseId(expense._id);
        setShowAddPanel(true);
    };

    useEffect(() => {
        const newCategoryWiseData = {};
        allCategories.forEach((category) => {
            newCategoryWiseData[category] = {
                count: getCategoryExpenseCount(category),
                totalAmount: getCategoryTotalAmount(category),
                average: getAverageTransaction(category),
            };
        });
        setCategoryWiseData(newCategoryWiseData);
        console.log('Category Wise Data:', newCategoryWiseData);
    }, [expenses]);

    const getCategoryExpenseCount = (category) => {
        return expenses.filter((expense) => expense.category === category).length;
    };

    const getCategoryTotalAmount = (category) => {
        const categoryExpenses = expenses.filter((expense) => expense.category === category);
        return categoryExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    };

    const getAverageTransaction = (category) => {
        const count = getCategoryExpenseCount(category);
        if (count === 0) {
            return 0;
        }
        return getCategoryTotalAmount(category) / count;
    };

    const recentData = (days) => {
        const getRecentExpensesData = () => {
            if (!expenses) return [];

            const today = new Date();
            const fewDaysAgo = new Date(today);
            fewDaysAgo.setDate(today.getDate() - days);

            return expenses.filter((expense) => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= fewDaysAgo && expenseDate <= today;
            });
        };
        if(days===7){
           setRecentDaysExpenses(getRecentExpensesData());
           console.log("recentDaysExpenses", recentDaysExpenses); 
        }
        if(days===30){
            setMonthlyData(getRecentExpensesData());
            console.log("monthlyData", monthlyData);
        }
    };


    useEffect(() => {
        recentData(7);
        recentData(30);
    }, [expenses]);

    useEffect(() => {
        console.log(recentDaysExpenses);
    }, [recentDaysExpenses])

    const value = {
        amount,
        setAmount,
        category,
        setCategory,
        date,
        setDate,
        allCategories,
        handleAddExpense,
        expenses,
        handleDelete,
        handleEdit,
        showAddPanel,
        setShowAddPanel,
        getCategoryExpenseCount,
        getCategoryTotalAmount,
        getAverageTransaction,
        setCategoryWiseData,
        categoryWiseData,
        // last7DaysExpenses,
        recentDaysExpenses,
        monthlyData,
    };

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default ContextProvider;