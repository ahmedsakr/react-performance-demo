import { scaleLinear } from "d3-scale";
import Intl from "currency-formatter";
import { line } from "d3-shape";
import Decimal from "decimal.js";
import styled from "styled-components";
import { MarketData, HistoricalPerformancePoint } from "./data-generator";

const MetadataRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
`;

const MetadataRow = ({
  rowName,
  value,
}: {
  rowName: string;
  value: string;
}) => {
  return (
    <MetadataRowContainer>
      <text>{rowName}</text>
      <text>{value}</text>
    </MetadataRowContainer>
  );
};

const formatDollarValue = (value: number) =>
  Intl.format(value, { code: "CAD" });

export const MarketMetdataNoMemos = ({
  marketData,
}: {
  marketData: MarketData;
}) => {
  const formattedBid = formatDollarValue(marketData.bid);
  const formattedAsk = formatDollarValue(marketData.ask);
  const formattedLastSale = formatDollarValue(marketData.lastSale);
  const formattedMarketCap = formatDollarValue(marketData.marketCap);

  const totalPerformance = marketData.historicalPerformance.reduce(
    (accum, curr) => accum + curr.performance,
    0,
  );

  const historicalSvgScales = {
    x: scaleLinear([0, marketData.historicalPerformance.length], [0, 100]),
    y: scaleLinear([-1, 1], [0, 50]),
  };
  const historicalSvgPathGen = line<HistoricalPerformancePoint>()
    .x((_, idx) => historicalSvgScales.x(idx))
    .y((d) => historicalSvgScales.y(d.performance));
  const svgPath = historicalSvgPathGen(marketData.historicalPerformance);

  return (
    <>
      <MetadataRow rowName="Bid" value={formattedBid} />
      <MetadataRow rowName="Ask" value={formattedAsk} />
      <MetadataRow rowName="Bid Size" value={marketData.bidSize.toString()} />
      <MetadataRow rowName="Ask Size" value={marketData.askSize.toString()} />
      <MetadataRow rowName="Last Sale" value={formattedLastSale} />
      <MetadataRow rowName="Volume" value={marketData.volume.toString()} />
      <MetadataRow rowName="Market Cap" value={formattedMarketCap} />
      <MetadataRow
        rowName={`Performance (${marketData.historicalPerformance.length} days)`}
        value={`${new Decimal(totalPerformance).toDecimalPlaces(2).toNumber()}%`}
      />
      <svg width={100} height={50}>
        <path d={svgPath || ""} stroke="green" strokeWidth={2} />
      </svg>
    </>
  );
};
