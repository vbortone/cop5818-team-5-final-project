"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  name: string;
  portfolioGrowth: number;
  spyPerformance: number;
};

type ExerciseChartProps = {
  data: ChartData[];
};

export default function ExerciseChart({ data }: ExerciseChartProps) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">
        Portfolio Growth vs SPY Performance (Last 3 Years Monthly)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="portfolioGrowth"
            stroke="#000000"
            strokeWidth={2}
            dot
            name="Portfolio Growth"
          />
          <Line
            type="monotone"
            dataKey="spyPerformance"
            stroke="#b3b3b3"
            strokeWidth={2}
            dot
            name="SPY Performance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
