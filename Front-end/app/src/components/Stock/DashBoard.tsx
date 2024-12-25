// components/Dashboard/DashboardContent.js

import React from 'react';

function Dashboard() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Welcome back, [Username]!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <h3 className="text-lg font-bold">Portfolio Value</h3>
          <p className="text-xl">$123,456</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h3 className="text-lg font-bold">Stocks Tracked</h3>
          <p className="text-xl">15</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg">
          <h3 className="text-lg font-bold">Upcoming Investments</h3>
          <p className="text-xl">5</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
