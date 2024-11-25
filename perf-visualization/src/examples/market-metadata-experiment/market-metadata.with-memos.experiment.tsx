import styled from "styled-components";
import Intl from "currency-formatter";
import { HistoricalPerformancePoint, MarketData } from "./data-generator";
import React, { useMemo } from "react";
import Decimal from "decimal.js";
import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";

const MetadataRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
`;

const MemoizedMetadataRow = React.memo(
  ({ rowName, value }: { rowName: string; value: string }) => {
    return (
      <MetadataRowContainer>
        <text>{rowName}</text>
        <text>{value}</text>
      </MetadataRowContainer>
    );
  },
);

const formatDollarValue = (value: number) =>
  Intl.format(value, { code: "CAD" });

export const MarketMetdataWithMemos = React.memo(
  ({ marketData }: { marketData: MarketData }) => {
    const formattedBid = useMemo(
      () => formatDollarValue(marketData.bid),
      [marketData.bid],
    );
    const formattedAsk = useMemo(
      () => formatDollarValue(marketData.ask),
      [marketData.ask],
    );
    const formattedLastSale = useMemo(
      () => formatDollarValue(marketData.lastSale),
      [marketData.lastSale],
    );
    const formattedMarketCap = useMemo(
      () => formatDollarValue(marketData.marketCap),
      [marketData.marketCap],
    );
    const totalPerformance = useMemo(() => {
      const total = marketData.historicalPerformance.reduce(
        (accum, curr) => accum + curr.performance,
        0,
      );

      return new Decimal(total).toDecimalPlaces(2).toNumber();
    }, [marketData.historicalPerformance]);

    const historicalSvgScales = useMemo(
      () => ({
        x: scaleLinear([0, marketData.historicalPerformance.length], [0, 100]),
        y: scaleLinear([-1, 1], [0, 50]),
      }),
      [marketData.historicalPerformance],
    );
    const historicalSvgPathGen = useMemo(
      () =>
        line<HistoricalPerformancePoint>()
          .x((_, idx) => historicalSvgScales.x(idx))
          .y((d) => historicalSvgScales.y(d.performance)),
      [historicalSvgScales],
    );
    const svgPath = useMemo(
      () => historicalSvgPathGen(marketData.historicalPerformance),
      [historicalSvgPathGen, marketData.historicalPerformance],
    );

    const HistoricalChart = useMemo(() => {
      return (
        <svg width={100} height={50}>
          <path d={svgPath || ""} stroke="green" strokeWidth={2} />
        </svg>
      );
    }, [svgPath]);

    return (
      <>
        <MemoizedMetadataRow rowName="Bid" value={formattedBid} />
        <MemoizedMetadataRow rowName="Ask" value={formattedAsk} />
        <MemoizedMetadataRow
          rowName="Bid Size"
          value={useMemo(
            () => marketData.bidSize.toString(),
            [marketData.bidSize],
          )}
        />
        <MemoizedMetadataRow
          rowName="Ask Size"
          value={useMemo(
            () => marketData.askSize.toString(),
            [marketData.askSize],
          )}
        />
        <MemoizedMetadataRow rowName="Last Sale" value={formattedLastSale} />
        <MemoizedMetadataRow
          rowName="Volume"
          value={useMemo(
            () => marketData.volume.toString(),
            [marketData.volume],
          )}
        />
        <MemoizedMetadataRow rowName="Market Cap" value={formattedMarketCap} />
        <MemoizedMetadataRow
          rowName={`Performance (${marketData.historicalPerformance.length} days)`}
          value={`${totalPerformance}%`}
        />
        {HistoricalChart}
      </>
    );
  },
);
