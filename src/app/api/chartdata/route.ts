import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
import { convertToHistoricalResult } from "@/lib/yf2";

export async function POST(req: NextRequest) {
  // Parse the incoming request
  const { etfs } = await req.json();

  // Log the received ETF list
  console.log("Received ETF list:", etfs);

  // Validate the ETF list
  if (!Array.isArray(etfs) || etfs.length === 0) {
    console.error("Invalid ETF list provided:", etfs);
    return NextResponse.json(
      { error: "Invalid ETF list provided." },
      { status: 400 }
    );
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1); // 1 year ago

  console.log(`Fetching data for the period: ${startDate.toISOString()} - ${endDate.toISOString()}`);

  // Initialize aggregated data structure
  const dailyAggregatedData: {
    [date: string]: { date: string; sum: number; count: number };
  } = {};

  try {
    for (const etf of etfs) {
      try {
        console.log(`Fetching data for ETF: ${etf}`);

        // Fetch data from Yahoo Finance
        const rawData = await yahooFinance.chart(etf, {
          period1: startDate.toISOString().split("T")[0],
          period2: endDate.toISOString().split("T")[0],
          interval: "1d", // Daily data
        });

        console.log(`Raw data for ${etf}:`, rawData);

        // Convert raw data to a usable format
        const data = convertToHistoricalResult(rawData);
        console.log(`Converted data for ${etf}:`, data);

        // Aggregate data
        data.forEach((entry) => {
          const date = entry.date.toISOString().split("T")[0];
          if (!dailyAggregatedData[date]) {
            dailyAggregatedData[date] = { date, sum: 0, count: 0 };
          }
          dailyAggregatedData[date].sum += entry.close ?? 0;
          dailyAggregatedData[date].count++;
        });

        console.log(`Aggregated data for ${etf} updated.`);
      } catch (etfError) {
        console.error(`Error fetching data for ETF ${etf}:`, etfError);
      }
    }

    // Transform aggregated data into chart-ready format
    const chartData = Object.values(dailyAggregatedData).map((entry) => ({
      date: entry.date,
      etfPortfolio: entry.sum / entry.count,
      spx: (entry.sum / entry.count) * 0.95, // Example SPX calculation
    }));

    console.log("Final aggregated chart data:", chartData);

    // Return the chart data
    return NextResponse.json(chartData, { status: 200 });
  } catch (error: unknown) {
    console.error("Unexpected error while processing chart data:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
