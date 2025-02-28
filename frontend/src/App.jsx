import React, { useState } from 'react';
import ContextProvider from './context/context';
import AddExpense from './components/AddExpense';
import CategoryCard from './components/CategoryCard';
import Statement from './components/Statement';
import PieChartComponent from './components/Chart';
import RecentData from './components/recentData';
import MonthlyData from './components/monthlyData';

const NavItem = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md font-medium transition-colors text-sm sm:text-base ${active
      ? 'bg-blue-600 text-white shadow-md'
      : 'text-gray-700 hover:bg-gray-100'
      }`}
  >
    {children}
  </button>
);

function App() {
  const [activePage, setActivePage] = useState('CategoryCard');

  const renderPage = () => {
    switch (activePage) {
      case 'CategoryCard':
        return <CategoryCard />;
      case 'AddExpense':
        return <AddExpense />;
      case 'Statement':
        return <Statement />;
      case 'PieChart':
        return <PieChartComponent />;
      case 'Week':
        return <RecentData />;
      case 'Month':
        return <MonthlyData />;
      default:
        return <CategoryCard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between h-auto sm:h-16 items-center py-2 sm:py-0">
            <div className="flex-shrink-0 flex items-center mb-2 sm:mb-0">
              <h1 className="text-xl font-bold text-blue-600">ExpenseTracker</h1>
            </div>
            <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-3">
              <NavItem
                active={activePage === 'CategoryCard'}
                onClick={() => setActivePage('CategoryCard')}
              >
                Categories
              </NavItem>
              <NavItem
                active={activePage === 'AddExpense'}
                onClick={() => setActivePage('AddExpense')}
              >
                Add Expense
              </NavItem>
              <NavItem
                active={activePage === 'Statement'}
                onClick={() => setActivePage('Statement')}
              >
                Statement
              </NavItem>
              <NavItem
                active={activePage === 'PieChart'}
                onClick={() => setActivePage('PieChart')}
              >
                Analysis
              </NavItem>
              <NavItem
                active={activePage === 'Week'}
                onClick={() => setActivePage('Week')}
              >
                Weekly
              </NavItem>
              <NavItem
                active={activePage === 'Month'}
                onClick={() => setActivePage('Month')}
              >
                Monthly
              </NavItem>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default function AppWithContext() {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}