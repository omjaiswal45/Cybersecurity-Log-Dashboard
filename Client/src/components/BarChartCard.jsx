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
      <h3 className="text-lg font-semibold mb-4">Event Type Frequency</h3>
   <ResponsiveContainer width="100%" height="100%">
  <BarChart
    data={barChartData}
    margin={{ top: 10, right: 30, left: 10, bottom: 60 }}
  >
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
    <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
  </BarChart>
</ResponsiveContainer>

    </div>
  );
}
