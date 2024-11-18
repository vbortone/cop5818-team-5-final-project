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

    // Calculate date range for the past year
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1); // One year ago

    // Fetch daily historical data for each ETF and calculate the daily average
    const dailyAggregatedData: {
      [date: string]: { date: string; sum: number; count: number };
    } = {};

    for (const etf of etfs) {
      const rawData = await yahooFinance.chart(etf, {
        period1: startDate.toISOString().split("T")[0],
        period2: endDate.toISOString().split("T")[0],
        interval: "1d", // Daily data
      });

      const data = convertToHistoricalResult(rawData);

      data.forEach((entry) => {
        const date = entry.date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        if (!dailyAggregatedData[date]) {
          dailyAggregatedData[date] = {
            date: date,
            sum: 0,
            count: 0,
          };
        }
        dailyAggregatedData[date].sum += entry.close ?? 0;
        dailyAggregatedData[date].count++;
      });
    }

    // Calculate the average for each day
    const portfolioData = Object.values(dailyAggregatedData).map((entry) => ({
      date: entry.date,
      etfPortfolio: entry.sum / entry.count,
    }));

    // Fetch daily SPY data for the same period to use as a comparison
    const rawSpyData = await yahooFinance.chart("SPY", {
      period1: startDate.toISOString().split("T")[0],
      period2: endDate.toISOString().split("T")[0],
      interval: "1d", // Daily data
    });

    const spyData = convertToHistoricalResult(rawSpyData);

    const spyPerformance = spyData.map((entry) => ({
      date: entry.date.toISOString().split("T")[0],
      spx: entry.close ?? 0,
    }));

    // Merge portfolioData and spyPerformance by date for the frontend chart
    const mergedData = portfolioData.map((portfolioEntry) => {
      const spyEntry = spyPerformance.find(
        (spyEntry) => spyEntry.date === portfolioEntry.date
      );
      return {
        date: portfolioEntry.date,
        etfPortfolio: portfolioEntry.etfPortfolio,
        spx: spyEntry?.spx || 0,
      };
    });

    return NextResponse.json(mergedData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
