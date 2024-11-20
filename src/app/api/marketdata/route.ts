import yahooFinance from "yahoo-finance2";
import { NextResponse } from "next/server";
import { convertToHistoricalResult } from "@/lib/yf2";

// Function to fetch historical data and calculate MoM, QoQ, and YTD changes
const fetchChangeMetrics = async (ticker: string) => {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastQuarter = new Date(today);
  lastQuarter.setMonth(lastQuarter.getMonth() - 3);
  const startOfYear = new Date(today.getFullYear(), 0, 1);

  const rawData = await yahooFinance.chart(ticker, {
    period1: startOfYear.toISOString().split("T")[0],
    period2: today.toISOString().split("T")[0],
    interval: "1mo",
  });

  const historicalData = convertToHistoricalResult(rawData);

  if (historicalData.length === 0) {
    return { MoM: 0, QoQ: 0, YTD: 0 };
  }

  const latestPrice = historicalData[historicalData.length - 1]?.close || 0;
  const oneMonthAgoPrice =
    historicalData.length > 1
      ? historicalData[historicalData.length - 2]?.close || latestPrice
      : latestPrice;
  const oneQuarterAgoPrice =
    historicalData.length > 3
      ? historicalData[historicalData.length - 4]?.close || latestPrice
      : latestPrice;
  const startOfYearPrice = historicalData[0]?.close || latestPrice;

  const MoM = ((latestPrice - oneMonthAgoPrice) / oneMonthAgoPrice) * 100;
  const QoQ = ((latestPrice - oneQuarterAgoPrice) / oneQuarterAgoPrice) * 100;
  const YTD = ((latestPrice - startOfYearPrice) / startOfYearPrice) * 100;

  return { MoM, QoQ, YTD };
};

// Function to fetch data for multiple tickers and calculate average metrics
const fetchMultipleTickersData = async (tickerArray: string[]) => {
  const tickerPromises = tickerArray.map(async (ticker) => {
    const quoteData = await yahooFinance.quote(ticker);
    const changeMetrics = await fetchChangeMetrics(ticker);
    return { ...quoteData, ...changeMetrics };
  });
  const results = await Promise.all(tickerPromises);

  const averagePrice =
    results.reduce(
      (acc, result) => acc + (result.regularMarketPrice ?? 0),
      0
    ) / results.length;
  const averageMoM =
    results.reduce((acc, result) => acc + (result.MoM ?? 0), 0) /
    results.length;
  const averageQoQ =
    results.reduce((acc, result) => acc + (result.QoQ ?? 0), 0) /
    results.length;
  const averageYTD =
    results.reduce((acc, result) => acc + (result.YTD ?? 0), 0) /
    results.length;

  return {
    averagePrice,
    changePercent: {
      MoM: averageMoM,
      QoQ: averageQoQ,
      YTD: averageYTD,
    },
    tickers: results.map((result) => ({
      symbol: result.symbol,
      price: result.regularMarketPrice,
    })),
  };
};

export async function GET() { // Removed `request` since it's unused
  try {
    // Symbols for SPX, MEME, MAGSeven, VIX, and AGG
    const tickers = {
      SPX: "^GSPC",
      MEME: [
        "GME",
        "AMC",
        "TLRY",
        "ANVS",
        "MAXN",
        "MARA",
        "CHWY",
        "BB",
        "AZZ",
        "KOSS",
        "ASTS",
        "RIVN",
        "CVNA",
      ],
      MAGSeven: ["MSFT", "AMZN", "META", "AAPL", "GOOGL", "NVDA", "TSLA"],
      VIX: "^VIX",
      AGG: "AGG",
    };

    // Fetch current data for individual tickers
    const [spxData, vixData, aggData] = await Promise.all([
      yahooFinance.quote(tickers.SPX),
      yahooFinance.quote(tickers.VIX),
      yahooFinance.quote(tickers.AGG),
    ]);

    // Fetch data for MEME and MAGSeven tickers
    const [memeData, magSevenData] = await Promise.all([
      fetchMultipleTickersData(tickers.MEME),
      fetchMultipleTickersData(tickers.MAGSeven),
    ]);

    // Prepare response data
    const marketData = {
      SPX: {
        name: "S&P 500",
        price: spxData.regularMarketPrice,
        changePercent: await fetchChangeMetrics(tickers.SPX),
      },
      VIX: {
        name: "VIX",
        price: vixData.regularMarketPrice,
        changePercent: await fetchChangeMetrics(tickers.VIX),
      },
      AGG: {
        name: "US Bonds",
        price: aggData.regularMarketPrice,
        changePercent: await fetchChangeMetrics(tickers.AGG),
      },
      MEME: {
        name: "MEME",
        price: memeData.averagePrice,
        changePercent: memeData.changePercent,
      },
      MAGSeven: {
        name: "MAG 7",
        price: magSevenData.averagePrice,
        changePercent: magSevenData.changePercent,
      },
    };

    return NextResponse.json(marketData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
