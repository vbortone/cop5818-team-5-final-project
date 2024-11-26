"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  ChartContainer,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

type ChartDataPoint = {
  date: string;
  etfPortfolio: number;
  spx: number;
};

const chartConfig = {
  etfPortfolio: {
    label: "ETF Portfolio",
    color: "#8884d8",
  },
  spx: {
    label: "SPX",
    color: "#82ca9d",
  },
} satisfies ChartConfig;

export default function PortfolioGrowthChart(props: {
  chartData: ChartDataPoint[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Portfolio Growth vs SPX Performance (1-Year Daily)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {props.chartData.length === 0 && <p>No chart data available</p>}
        {props.chartData.length > 0 && (
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <LineChart data={props.chartData} accessibilityLayer>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="etfPortfolio"
                stroke="var(--color-etfPortfolio)"
                name="ETF Portfolio"
              />
              <Line
                type="monotone"
                dataKey="spx"
                stroke="var(--color-spx)"
                name="SPX"
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
