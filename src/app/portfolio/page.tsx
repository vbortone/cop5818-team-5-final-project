"use client";

import { useEffect, useState } from "react";
import ExerciseChart from "@/components/ExerciseChart";
import RetirementForm from "@/components/RetirementForm";

type MarketData = {
  name: string;
  price: number;
  changePercent?: {
    MoM: number;
    QoQ: number;
    YTD: number;
  };
  individualPrices?: { symbol: string; price: number }[];
};

export default function Page() {
  const [marketData, setMarketData] = useState<{ [key: string]: MarketData }>(
    {}
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend API
    async function fetchData() {
      try {
        const response = await fetch("/api/marketdata");
        const data = await response.json();
        setMarketData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data: ", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Render only when the marketData is available and loading is complete
  if (loading) {
    return <p>Loading market data...</p>;
  }

  // Define the order of cards to be displayed
  const orderedTickers = ["SPX", "VIX", "AGG"];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Metrics Cards for Market Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Render a card for each ticker in the specified order */}
        {orderedTickers.map((key) => {
          const data = marketData[key];
          return (
            data && (
              <div key={key} className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-xl font-bold">{data.name}</h2>
                <p className="text-3xl font-semibold mt-4">
                  ${data.price.toFixed(2)}
                </p>
                {data.changePercent && (
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <span className="font-medium">MoM:</span>
                      <span
                        className={`font-medium ${
                          data.changePercent.MoM < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {data.changePercent.MoM !== undefined
                          ? `${data.changePercent.MoM.toFixed(2)}%`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">QoQ:</span>
                      <span
                        className={`font-medium ${
                          data.changePercent.QoQ < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {data.changePercent.QoQ !== undefined
                          ? `${data.changePercent.QoQ.toFixed(2)}%`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">YTD:</span>
                      <span
                        className={`font-medium ${
                          data.changePercent.YTD < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {data.changePercent.YTD !== undefined
                          ? `${data.changePercent.YTD.toFixed(2)}%`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          );
        })}
      </div>

      {/* Exercise Chart and Retirement Form Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <ExerciseChart />
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <RetirementForm />
        </div>
      </div>
    </div>
  );
}
