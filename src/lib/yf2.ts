
import { ChartResultArray } from "node_modules/yahoo-finance2/dist/esm/src/modules/chart";
import { HistoricalHistoryResult } from "node_modules/yahoo-finance2/dist/esm/src/modules/historical";

export function convertToHistoricalResult(
  result: ChartResultArray
): HistoricalHistoryResult {
  return result.quotes
    .map((quote) => ({
      ...quote,
      open: quote.open || 0,
      high: quote.high || 0,
      low: quote.low || 0,
      close: quote.close || 0,
      volume: quote.volume || 0,
    }))
    .filter(
      (dailyQuote) => dailyQuote.low !== null || dailyQuote.high !== null
    );
};
