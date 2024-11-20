"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RetirementForm from "@/components/RetirementForm";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

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

type EtfRecommendation = {
  ticker: string;
  name: string;
};

type ChartDataPoint = {
  date: string;
  etfPortfolio: number;
  spx: number;
};

export default function Page() {
  const [marketData, setMarketData] = useState<{ [key: string]: MarketData }>({});
  const [loading, setLoading] = useState(true);
  const [etfRecommendations, setEtfRecommendations] = useState<EtfRecommendation[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  // Fetch market data when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/marketdata");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMarketData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetchData function:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleEtfRecommendations = async (
    formData: React.FormEvent<HTMLFormElement>
  ) => {
    formData.preventDefault();

    const target = formData.target as typeof formData.target & {
      age: { value: string };
      retirementAge: { value: string };
      jobTitle: { value: string };
      income: { value: string };
      savings: { value: string };
      savingsPercentage: { value: string };
    };

    const formValues = {
      age: target.age.value,
      retirementAge: target.retirementAge.value,
      jobTitle: target.jobTitle.value,
      income: target.income.value,
      savings: target.savings.value,
      savingsPercentage: target.savingsPercentage.value,
    };

    try {
      console.log("Form values:", formValues);

      const response = await axios.post("/api/etf-recommendations", formValues);

      if (response.status === 200) {
        const recommendedEtfs = response.data.recommendations;
        console.log("ETF recommendations:", recommendedEtfs);

        if (Array.isArray(recommendedEtfs)) {
          setEtfRecommendations(recommendedEtfs);
        } else {
          console.error("Expected an array for ETF recommendations but received:", recommendedEtfs);
          setEtfRecommendations([]);
        }

        const chartResponse = await axios.post("/api/chartdata", {
          etfs: recommendedEtfs.map((etf: EtfRecommendation) => etf.ticker),
        });

        if (chartResponse.status === 200 && Array.isArray(chartResponse.data) && chartResponse.data.length > 0) {
          console.log("Chart data received:", chartResponse.data);

          // Validate that each data point has the required properties
          chartResponse.data.forEach((dataPoint, index) => {
            if (!dataPoint.date || dataPoint.etfPortfolio === undefined || dataPoint.spx === undefined) {
              console.error(`Invalid data format at index ${index}:`, dataPoint);
            }
          });

          setChartData(chartResponse.data);
        } else {
          console.error("No data received for chart or unexpected format");
          setChartData([]); // Clear chart data if no valid data is returned
        }
      } else {
        console.error("Unexpected response status:", response.status);
        throw new Error("Failed to load ETF recommendations");
      }
    } catch (error) {
      console.error("Error in handleEtfRecommendations:", error);
    }
  };

  if (loading) {
    return <p>Loading market data...</p>;
  }

  const orderedTickers = ["SPX", "VIX", "AGG"];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
                        {data.changePercent.MoM.toFixed(2)}%
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
                        {data.changePercent.QoQ.toFixed(2)}%
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
                        {data.changePercent.YTD.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          );
        })}
      </div>

      <div className="bg-white shadow-md p-6 rounded-lg mb-6 text-center">
        <h3 className="text-xl font-bold mb-4">
          Portfolio Growth vs SPX Performance (1-Year Daily)
        </h3>
        <div className="flex justify-center">
          <LineChart width={600} height={300} data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Render lines if chartData has entries */}
            {chartData.length > 0 && (
              <>
                <Line
                  type="monotone"
                  dataKey="etfPortfolio"
                  stroke="#8884d8"
                  name="ETF Portfolio"
                />
                <Line type="monotone" dataKey="spx" stroke="#82ca9d" name="SPX" />
              </>
            )}
          </LineChart>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <RetirementForm onSubmit={handleEtfRecommendations} />
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-bold">Suggested ETFs</h3>
          <ul>
            {Array.isArray(etfRecommendations) ? (
              etfRecommendations.map((etf, index) => (
                <li key={index} className="mt-2 text-lg">
                  <strong>{etf.ticker}</strong>: {etf.name}
                </li>
              ))
            ) : (
              <p>No ETF recommendations available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
