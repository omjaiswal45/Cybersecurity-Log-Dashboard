
import React, { useEffect, useState } from 'react';
import { fetchLogs } from '../services/api';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalLogs, setTotalLogs] = useState(0);

  useEffect(() => {
    fetchLogs(page + 1, rowsPerPage).then((res) => {
      setLogs(res.data.logs);
      setTotalLogs(res.data.total);
    });
  }, [page, rowsPerPage]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

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
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen overflow-x-hidden space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Security Logs</h2>

      <input
        type="text"
        placeholder="Search by username or event type"
        className="border px-4 py-2 rounded w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto border rounded-lg bg-white shadow">
        <div className="max-h-[450px] overflow-y-auto overflow-x-hidden">
          <table className="min-w-full text-sm text-left text-gray-700 table-auto w-full">
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
        </div>
      </div>

      {/* Pagination */}
      <div>
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
  );
};

export default Logs;
