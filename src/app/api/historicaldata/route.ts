/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import yahooFinance from "yahoo-finance2";
import { NextRequest, NextResponse } from "next/server";
import { convertToHistoricalResult } from "@/lib/yf2";

export async function GET(req: NextRequest) {
  try {
    // List of ETFs
    const etfs = [
      "XLK",
      "XLY",
      "SPY",
      "XLV",
      "XLF",
      "XLI",
      "XLE",
      "XLP",
      "XLRE",
      "SPY",
      "XLB",
      "XLU",
      "EDU",
    ];

    // Calculate date range for the last 3 years
    const currentYear = new Date().getFullYear();
    const startDate = `${currentYear - 3}-01-01`; // 3 years ago from the current year
    const endDate = `${currentYear}-12-31`;

    // Fetch historical data for each ETF and calculate the average for each month
    const monthlyAggregatedData: {
      [date: string]: { date: string; sum: number; count: number };
    } = {};
    for (const etf of etfs) {
      const rawData = await yahooFinance.chart(etf, {
        period1: startDate,
        period2: endDate,
        interval: "1mo", // Monthly data
      });

      const data =
        convertToHistoricalResult(rawData);

      data.forEach((entry) => {
        const month = entry.date.toISOString().slice(0, 7); // Format as YYYY-MM
        if (!monthlyAggregatedData[month]) {
          monthlyAggregatedData[month] = {
            date: month,
            sum: 0,
            count: 0,
          };
        }
        monthlyAggregatedData[month].sum += entry.close ?? 0;
        monthlyAggregatedData[month].count++;
      });
    }

    // Calculate the average for each month
    const portfolioData = Object.values(monthlyAggregatedData).map((entry) => ({
      name: entry.date,
      average: entry.sum / entry.count,
    }));

    // Fetch SPY data for the same period to use as a comparison
    const rawSpyData = await yahooFinance.chart("SPY", {
      period1: startDate,
      period2: endDate,
      interval: "1mo", // Monthly data
    });

    const spyData = convertToHistoricalResult(rawSpyData);

    const spyPerformance = spyData.map((entry) => ({
      name: entry.date.toISOString().slice(0, 7),
      value: entry.close ?? 0,
    }));

    return NextResponse.json(
      {
        portfolioData,
        spyPerformance,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
