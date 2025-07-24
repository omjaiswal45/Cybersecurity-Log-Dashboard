import React from 'react';
import Sidebar from './SIdebar'; 
import Header from './Header';
import Dashboard from './Dashboard';

const Body = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Body;



