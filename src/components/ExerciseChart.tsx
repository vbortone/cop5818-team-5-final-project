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
import { useEffect, useState } from "react";

type ChartData = {
  name: string;
  portfolioGrowth: number;
  spyPerformance: number;
};

export default function ExerciseChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Use an arrow function to avoid strict mode issues
      const fetchData = async () => {
        try {
          const response = await fetch("/api/getHistoricalData");
          const data = await response.json();

          // Prepare data for the chart
          const formattedData = data.portfolioData.map(
            (entry: any, index: number) => ({
              name: entry.name, // YYYY-MM format
              portfolioGrowth: entry.average,
              spyPerformance: data.spyPerformance[index]?.value || 0,
            })
          );

          setChartData(formattedData);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchData();
    }
  }, [isClient]);

  if (!isClient) {
    return null; // Return nothing until client-side rendering happens
  }

  return (
    <div className="bg-white shadow-md p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">
        Portfolio Growth vs SPY Performance (Last 3 Years Monthly)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
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
