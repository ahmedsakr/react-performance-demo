import Decimal from "decimal.js";
import { subDays } from "date-fns";
import { ExampleControlsValues } from "./example.context";

export interface HistoricalPerformancePoint {
  date: number;
  performance: number;
}

export interface MarketData {
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  volume: number;
  marketCap: number;
  lastSale: number;
  historicalPerformance: HistoricalPerformancePoint[];
}

export const generateMarketData = (
  timeSinceExperimentStartedMs: number,
  historicalWindowSize: number,
  changingProps: ExampleControlsValues["changingProps"],
  existingData: MarketData | undefined,
): MarketData => {
  return {
    bid:
      changingProps.bid || !existingData
        ? new Decimal(Math.random() * 200).toDecimalPlaces(2).toNumber()
        : existingData.bid,
    ask:
      changingProps.ask || !existingData
        ? new Decimal(Math.random() * 200).toDecimalPlaces(2).toNumber()
        : existingData.ask,
    lastSale:
      changingProps.lastSale || !existingData
        ? new Decimal(Math.random() * 200).toDecimalPlaces(2).toNumber()
        : existingData.lastSale,
    bidSize:
      changingProps.bidSize || !existingData
        ? new Decimal(Math.random() * 50).toDecimalPlaces(2).toNumber()
        : existingData.bidSize,
    askSize:
      changingProps.askSize || !existingData
        ? new Decimal(Math.random() * 50).toDecimalPlaces(2).toNumber()
        : existingData.askSize,
    volume:
      changingProps.volume || !existingData
        ? 40_000_000 + timeSinceExperimentStartedMs
        : existingData.volume,
    marketCap:
      changingProps.marketCap || !existingData
        ? 10_000_000_000 + timeSinceExperimentStartedMs
        : existingData.marketCap,
    historicalPerformance:
      changingProps.historicalPerformance || !existingData
        ? [...Array(historicalWindowSize)].map((_, idx) => ({
            date: subDays(new Date(), idx).getTime(),
            performance: Math.random() * (Math.random() > 0.5 ? -1 : 1),
          }))
        : existingData?.historicalPerformance,
  };
};
