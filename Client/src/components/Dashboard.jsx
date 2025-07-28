import React, { useEffect, useRef, useState } from 'react';
import { fetchLogs, fetchEventCounts } from '../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import LineChartCard from './LineChartCard';
import dayjs from 'dayjs';
import TablePagination from '@mui/material/TablePagination';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [eventCounts, setEventCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalLogs, setTotalLogs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetchLogs(page + 1, rowsPerPage).then((res) => {
      setLogs(res.data.logs);
      setTotalLogs(res.data.total);
      setIsLoading(false);
    });
    fetchEventCounts().then((res) => setEventCounts(res.data));
  }, [page, rowsPerPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const eventTypeOptions = [...new Set(logs.map(log => log.event_type))];

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const barChartData = Object.entries(eventCounts).map(([eventType, count]) => ({
    eventType,
    count,
  }));

  const filteredLogs = logs.filter(
    (log) =>
      (selectedTypes.length === 0 || selectedTypes.includes(log.event_type)) &&
      (
        log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.event_type.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const sortedLogs = [...filteredLogs].sort((a, b) =>
    sortOrder === 'asc'
      ? new Date(a.timestamp) - new Date(b.timestamp)
      : new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="p-4 md:p-6 space-y-10 bg-green-50 min-h-screen overflow-x-hidden">
      {/* Filter + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/2">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by username or event type"
            className="pl-10 pr-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(prev => !prev)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer flex items-center gap-2"
          >
            <span>Event Types</span>
            <FunnelIcon className="w-5 h-5 text-white" />
          </button>
          {showDropdown && (
            <div className="absolute mt-2 right-0 w-64 max-h-64 overflow-auto bg-white border shadow-lg rounded z-50">
              {eventTypeOptions.map((type) => (
                <label key={type} className="flex items-center px-4 py-2 hover:bg-green-100">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-4">Detailed Logs Table</h2>

        <div className="overflow-x-auto border rounded-lg">
          <div className="max-h-[450px] overflow-y-auto overflow-x-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-600 border-solid"></div>
              </div>
            ) : (
              <table className="min-w-full text-sm text-left text-gray-700 table-auto w-full">
                <thead className="bg-green-100 text-green-800 sticky top-0 z-10">
                  <tr>
                    <th
                      className="px-4 py-3 cursor-pointer select-none flex items-center gap-1 text-green-800 font-medium whitespace-nowrap"
                      onClick={toggleSortOrder}
                    >
                      Timestamp
                      <span className="p-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    </th>
                    <th className="px-4 py-3 border whitespace-nowrap">Event Type</th>
                    <th className="px-4 py-3 border whitespace-nowrap">Username</th>
                    <th className="px-4 py-3 border whitespace-nowrap hidden md:table-cell">Source IP</th>
                    <th className="px-4 py-3 border whitespace-nowrap hidden md:table-cell">Destination IP</th>
                    <th className="px-4 py-3 border whitespace-nowrap hidden lg:table-cell">Details</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-green-50 transition duration-150 ease-in-out">
                      <td className="px-4 py-2 border whitespace-nowrap">
                        {dayjs(log.timestamp).format('YYYY-MM-DD HH:mm')}
                      </td>
                      <td className="px-4 py-2 border whitespace-nowrap">{log.event_type}</td>
                      <td className="px-4 py-2 border whitespace-nowrap">{log.username}</td>
                      <td className="px-4 py-2 border whitespace-nowrap hidden md:table-cell">{log.source_ip}</td>
                      <td className="px-4 py-2 border whitespace-nowrap hidden md:table-cell">{log.destination_ip}</td>
                      <td className="px-4 py-2 border whitespace-nowrap hidden lg:table-cell">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <TablePagination
            component="div"
            count={totalLogs}
            page={page}
            onPageChange={(event, newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[10, 20, 50, 100]}
            labelRowsPerPage="Logs per page"
          />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-4">Event Type Frequency</h2>
        <div className="w-full h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
  dataKey="eventType"
  interval={0}
  angle={-45}
  textAnchor="end"
  height={70}
  tick={{ fontSize: 10, fill: '#374151' }}
/>
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-7">Events Trend Over Time</h2>
        <div className="w-full h-[400px] sm:h-[400px]">
          <LineChartCard />
        </div>
      </div>
    </div>
  );
}
