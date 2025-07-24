import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchEventCounts } from '../services/api';

export default function BarChartCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchEventCounts().then(res => {
      // Convert object to array for Recharts
      const formatted = Object.entries(res.data).map(([eventType, count]) => ({
        eventType,
        count,
      }));
      setData(formatted);
    });
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded-md w-full">
      <h3 className="text-lg font-semibold mb-4">📊 Event Type Frequency</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="eventType" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
