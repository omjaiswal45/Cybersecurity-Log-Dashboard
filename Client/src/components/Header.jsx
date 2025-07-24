import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

function Header() {
  return (
    <header className="bg-white px-6 py-4 shadow flex justify-between items-center border-b">
      <h1 className="text-2xl font-bold text-indigo-600">Security Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">Welcome, <span className="font-semibold">Admin</span></span>
        <UserCircleIcon className="w-9 h-9 text-indigo-500" />
      </div>
    </header>
  );
}

export default Header;
