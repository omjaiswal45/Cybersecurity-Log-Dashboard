import React from 'react';
import Sidebar from './SIdebar';
import Header from './Header';
import Dashboard from './Dashboard';

const Body = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SIdebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-100 p-4">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Body;
