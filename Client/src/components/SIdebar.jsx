import React, { useState } from 'react';
import { Menu } from 'lucide-react'; // You can also use any icon lib like react-icons

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">Cyber Admin</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar content */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block bg-gray-800 text-white p-4 w-full md:w-64 md:h-full absolute md:static z-50`}
      >
       
        <div className="hidden md:block">
          <h2 className="text-2xl font-bold mb-6">Cyber Admin</h2>
        </div>
        <ul className="space-y-4 mt-4 md:mt-0">
          <li className="hover:text-indigo-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-indigo-300 cursor-pointer">Logs</li>
          <li className="hover:text-indigo-300 cursor-pointer">Settings</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
