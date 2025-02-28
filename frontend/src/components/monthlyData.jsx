import React, { useContext, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Context } from '../context/context';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
        <p className="font-medium text-gray-900">{payload[0].payload.category}</p>
        <p className="text-gray-700">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

function MonthlyData() {
  const { monthlyData } = useContext(Context);

  const categoryWiseData = useMemo(() => {
    if (!monthlyData || monthlyData.length === 0) {
      return [];
    }

    const categoryTotals = monthlyData.reduce((acc, item) => {
      const category = item.category;
      const amount = item.amount;

      if (!acc[category]) {
        acc[category] = { category, totalAmount: 0 };
      }
      acc[category].totalAmount += amount;
      return acc;
    }, {});

    return Object.values(categoryTotals);
  }, [monthlyData]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Expense Breakdown by Category</h2>

      {categoryWiseData.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryWiseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis dataKey="totalAmount" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="totalAmount" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No expense data available.</p>
        </div>
      )}
    </div>
  );
}

export default MonthlyData;