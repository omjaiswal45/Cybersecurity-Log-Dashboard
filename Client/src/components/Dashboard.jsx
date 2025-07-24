import React, { useEffect, useState } from 'react';
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
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [eventCounts, setEventCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchLogs(page, limit).then((res) => {
      setLogs(res.data.logs);
      setTotalLogs(res.data.total);
    });
    fetchEventCounts().then((res) => setEventCounts(res.data));
  }, [page]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const barChartData = Object.entries(eventCounts).map(([eventType, count]) => ({
    eventType,
    count,
  }));

  const filteredLogs = logs.filter(
    (log) =>
      log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.event_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedLogs = [...filteredLogs].sort((a, b) =>
    sortOrder === 'asc'
      ? new Date(a.timestamp) - new Date(b.timestamp)
      : new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="p-4 md:p-6 space-y-10 bg-gray-100 min-h-screen">

      {/* Logs Table */}
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Detailed Logs Table</h2>

        <input
          type="text"
          placeholder="Search by username or event type"
          className="border px-4 py-2 rounded mb-4 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Responsive Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-indigo-100 text-indigo-800 sticky top-0 z-10">
              <tr>
                <th
                  className="px-4 py-3 cursor-pointer select-none flex items-center gap-1 text-indigo-800 font-medium whitespace-nowrap"
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
                <tr key={index} className="hover:bg-indigo-50 transition duration-150 ease-in-out">
                  <td className="px-4 py-2 border whitespace-nowrap">{dayjs(log.timestamp).fromNow()}</td>
                  <td className="px-4 py-2 border whitespace-nowrap">{log.event_type}</td>
                  <td className="px-4 py-2 border whitespace-nowrap">{log.username}</td>
                  <td className="px-4 py-2 border whitespace-nowrap hidden md:table-cell">{log.source_ip}</td>
                  <td className="px-4 py-2 border whitespace-nowrap hidden md:table-cell">{log.destination_ip}</td>
                  <td className="px-4 py-2 border whitespace-nowrap hidden lg:table-cell">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">Page {page}</span>
          <button
            onClick={() => setPage((prev) => (prev * limit < totalLogs ? prev + 1 : prev))}
            disabled={page * limit >= totalLogs}
            className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Event Type Frequency</h2>
        <div className="w-full h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="eventType" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Events Trend Over Time</h2>
        <div className="w-full h-[250px] sm:h-[300px]">
          <LineChartCard />
        </div>
      </div>
    </div>
  );
}
