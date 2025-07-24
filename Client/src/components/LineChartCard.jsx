import React, { useEffect, useState } from 'react';
import { fetchEventsByHour } from '../services/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function LineChartCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchEventsByHour().then((res) => {
      const entries = Object.entries(res.data);

      const sortedData = entries
        .map(([hour, count]) => {
          const dateObj = new Date(hour + ':00:00'); 
          return {
            hour,
            count,
            dateObj,
            formattedHour: dateObj.toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              hour12: false,
            }),
          };
        })
        .sort((a, b) => a.dateObj - b.dateObj);

      setData(sortedData);
    });
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">Events Trend Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 30, bottom: 60 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis
            dataKey="formattedHour"
            tick={{ fill: '#ccc', fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            interval={0}
            height={10}
          />
          <YAxis
            tick={{ fill: '#ccc', fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value) => [`${value}`, 'Count']}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4, stroke: '#fff', strokeWidth: 1 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
