import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
import { convertToHistoricalResult } from "@/lib/yf2";

export async function POST(req: NextRequest) {
  const { etfs } = await req.json(); // Parse JSON from request body

  if (!Array.isArray(etfs) || etfs.length === 0) {
    return NextResponse.json(
      { error: "Invalid ETF list provided." },
      { status: 400 }
    );
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1); // 1 year ago

  const dailyAggregatedData: {
    [date: string]: { date: string; sum: number; count: number };
  } = {};

  try {
    for (const etf of etfs) {
      const rawData = await yahooFinance.chart(etf, {
        period1: startDate.toISOString().split("T")[0],
        period2: endDate.toISOString().split("T")[0],
        interval: "1d", // Daily data
      });

      const data = convertToHistoricalResult(rawData);

      data.forEach((entry) => {
        const date = entry.date.toISOString().split("T")[0];
        if (!dailyAggregatedData[date]) {
          dailyAggregatedData[date] = { date, sum: 0, count: 0 };
        }
        dailyAggregatedData[date].sum += entry.close ?? 0;
        dailyAggregatedData[date].count++;
      });
    }

    const chartData = Object.values(dailyAggregatedData).map((entry) => ({
      date: entry.date,
      etfPortfolio: entry.sum / entry.count,
      spx: (entry.sum / entry.count) * 0.95, // Example SPX calculation
    }));

    console.log("Returning chart data:", chartData); // Debugging log
    return NextResponse.json(chartData, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching ETF data:", error);

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
