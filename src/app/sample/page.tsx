import MarketDataCardList from "@/components/market-data-card-list";
import PortfolioGrowthChart from "@/components/portfolio-growth-chart";
import RetirementFormCard from "@/components/retirement-form-card";

import { handleEtfRecommendations } from "@/lib/actions";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-6">
      <MarketDataCardList />
      <PortfolioGrowthChart chartData={[]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RetirementFormCard onSubmit={handleEtfRecommendations} />
      </div>
    </div>
  );
}
