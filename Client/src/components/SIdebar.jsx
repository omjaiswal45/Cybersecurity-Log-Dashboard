import React from 'react';
 function Sidebar() {
  return (
    <div className="w-64  bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Cyber Admin</h2>
      <ul className="space-y-4">
        <li>Dashboard</li>
        <li>Logs</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}
export default Sidebar;
