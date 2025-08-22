import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";

const data = [
  { time: "9AM", density: 30 },
  { time: "9:30AM", density: 50 },
  { time: "10AM", density: 45 },
  { time: "10:30AM", density: 70 },
  { time: "11AM", density: 60 },
  { time: "11:30AM", density: 90 },
  { time: "12PM", density: 80 },
  { time: "12:30PM", density: 100 },
  { time: "1PM", density: 60 },
  { time: "1:30PM", density: 85 },
  { time: "2PM", density: 95 },
];

const GraphCard = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="density"
          stroke="#2563eb" // default blue line
          strokeWidth={3}
          dot={(props) => {
            const { cx, cy, payload } = props;
            return (
              <circle
                cx={cx}
                cy={cy}
                r={4}
                fill={payload.density > 75 ? "#dc2626" : "#2563eb"}
              />
            );
          }}
          activeDot={{ r: 6 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphCard;
