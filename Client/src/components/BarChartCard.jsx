import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { fetchEventCounts } from '../services/api';

export default function BarChartCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchEventCounts().then((res) => {
      const formatted = Object.entries(res.data).map(([eventType, count]) => ({
        eventType,
        count,
      }));
      setData(formatted);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-4">
        Event Type Frequency
      </h2>
      <div className="w-full h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 60 }}>
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
  );
}
