import { getMarketData } from "@/lib/yf2";
import MarketDataCard from "@/components/market-data-card";

export default async function MarketDataCardList() {
    const orderedTickers = ["SPX", "VIX", "AGG"];
    const marketData = await getMarketData();

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {orderedTickers.map((key) => {
          const data = marketData[key];
          return data && <MarketDataCard marketData={data} key={data.id} />;
        })}
      </div>
    );

}