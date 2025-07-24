import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Sidebar from './SIdebar';
import Header from './Header';
import Dashboard from './Dashboard';
import Logs from '../pages/Logs';
import Settings from '../pages/Settings';

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <Outlet /> {/* Nested route components render here */}
        </main>
      </div>
    </div>
  );
};

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'logs',
          element: <Logs />,
        },
        {
          path: 'settings',
          element: <Settings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
