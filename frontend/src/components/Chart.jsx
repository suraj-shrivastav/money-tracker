import React, { useContext, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { Context } from '../context/context';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];
const RADIAN = Math.PI / 180;

// Custom label for the pie chart slices
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="12"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
        <p className="font-medium text-gray-900">{payload[0].name}</p>
        <p className="text-gray-700">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const PieChartComponent = () => {
    const { categoryWiseData } = useContext(Context);
    const [activeIndex, setActiveIndex] = useState(null);

    // Transform the categoryWiseData object into an array
    const pieData = Object.entries(categoryWiseData)
      .filter(([_, data]) => data.totalAmount > 0)
      .map(([name, data]) => ({
          name,
          value: data.totalAmount,
      }))
      .sort((a, b) => b.value - a.value); // Sort by value descending

    const totalAmount = pieData.reduce((sum, item) => sum + item.value, 0);

    // Handle mouse enter event
    const onPieEnter = (_, index) => {
      setActiveIndex(index);
    };

    // Handle mouse leave event
    const onPieLeave = () => {
      setActiveIndex(null);
    };

    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Expense Distribution</h2>
        
        {pieData.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={2}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        strokeWidth={activeIndex === index ? 2 : 0}
                        stroke="#fff"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    formatter={(value, entry) => (
                      <span className="text-gray-700">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg bg-gray-50">
                    <div 
                      className="w-4 h-4 mr-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex justify-between">
                        <span className="text-gray-600">${item.value.toFixed(2)}</span>
                        <span className="text-gray-500">
                          {((item.value / totalAmount) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No expense data available. Add expenses to see the chart.</p>
          </div>
        )}
      </div>
    );
};

export default PieChartComponent;