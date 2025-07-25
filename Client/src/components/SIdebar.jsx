import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-green-700 text-white p-4">
        <h2 className="text-xl font-bold">Cyber Admin</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block bg-green-700 text-white p-4 w-full md:w-64 md:h-full absolute md:static z-50`}
      >
        {/* Desktop Title */}
        <div className="hidden md:block">
          <h2 className="text-2xl font-bold mb-6">Cyber Admin</h2>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4 mt-4 md:mt-0">
          <li>
            <Link to="/" className="hover:text-green-300 transition-colors">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/logs" className="hover:text-green-300 transition-colors">
              Logs
            </Link>
          </li>
          <li>
            <Link to="/settings" className="hover:text-green-300 transition-colors">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
