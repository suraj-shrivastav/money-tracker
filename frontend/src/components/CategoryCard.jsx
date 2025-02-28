import { useContext } from "react";
import { Context } from "../context/context";

const CategoryCard = () => {
  const {
    allCategories,
    categoryWiseData,
    recentData
  } = useContext(Context);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Expense Categories</h2>
      
      <div className="space-y-4">
        {allCategories.map((category) => (
          <div 
            key={category} 
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Category Name - Left Side */}
              <div className="p-4 sm:p-6 sm:w-1/3 bg-gray-50 flex flex-col justify-between">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 sm:mb-0">{category}</h3>
                
                {/* <div className="flex flex-wrap gap-2 mt-auto pt-3 sm:pt-0">
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Detailed
                  </button>
                  
                  <button 
                    onClick={() => recentData(7)}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Last 7 days
                  </button>
                  
                  <button 
                    onClick={() => recentData(30)}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Last 30 days
                  </button>
                </div> */}
              </div>
              
              {/* Statistics - Right Side */}
              <div className="p-4 sm:p-6 sm:w-2/3 border-t sm:border-t-0 sm:border-l border-gray-100">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Total Expenses</p>
                    <p className="text-lg font-bold text-blue-700">
                      {categoryWiseData[category]?.count || 0}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Total Amount</p>
                    <p className="text-lg font-bold text-green-700">
                      ${(categoryWiseData[category]?.totalAmount || 0).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Avg/Transaction</p>
                    <p className="text-lg font-bold text-purple-700">
                      ${(categoryWiseData[category]?.average || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {allCategories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No categories available. Add expenses to create categories.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;