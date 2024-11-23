import Decimal from "decimal.js";

export interface MarketData {
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  volume: number;
  marketCap: number;
  lastSale: number;
}

export const generateMarketData = (timeSinceExperimentStartedMs: number): MarketData => {
  return {
    bid: new Decimal(Math.random() * 200).toDecimalPlaces(2).toNumber(),
    ask: new Decimal(Math.random() * 200).toDecimalPlaces(2).toNumber(),
    lastSale: new Decimal(Math.random() * 200).toDecimalPlaces(2).toNumber(),
    bidSize: new Decimal(Math.random() * 50).toDecimalPlaces(2).toNumber(),
    askSize: new Decimal(Math.random() * 50).toDecimalPlaces(2).toNumber(),
    volume: 40_000_000 + timeSinceExperimentStartedMs,
    marketCap: 10_000_000_000 + timeSinceExperimentStartedMs,
  }
} 