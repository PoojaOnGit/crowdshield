import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "10AM", density: 40 },
  { time: "11AM", density: 65 },
  { time: "12PM", density: 80 },
  { time: "1PM", density: 50 },
  { time: "2PM", density: 90 },
];

const GraphCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h2 className="font-semibold text-lg mb-3">📊 Crowd Density Trends</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="density" stroke="#2563eb" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphCard;
