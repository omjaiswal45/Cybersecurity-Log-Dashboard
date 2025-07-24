import React from 'react'
import Sidebar from './SIdebar'
import Header from './Header'
import Dashboard from './Dashboard'

const Body = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
        <Header/>
        <Dashboard/>
      </div>
    </div>
  )
}

export default Body