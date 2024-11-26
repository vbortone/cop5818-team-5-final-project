import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { TickerData } from "@/lib/yf2";

export default function MarketDataCard({ marketData }: { marketData: TickerData }) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-bold">{marketData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold mt-4">
          ${marketData.price.toFixed(2)}
        </p>
        {marketData.changePercent && (
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="font-medium">MoM:</span>
              <span
                className={`font-medium ${
                  marketData.changePercent.MoM < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {marketData.changePercent.MoM.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">QoQ:</span>
              <span
                className={`font-medium ${
                  marketData.changePercent.QoQ < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {marketData.changePercent.QoQ.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">YTD:</span>
              <span
                className={`font-medium ${
                  marketData.changePercent.YTD < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {marketData.changePercent.YTD.toFixed(2)}%
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
