import styled from "styled-components";
import Intl from 'currency-formatter';
import { MarketData } from "./data-generator";
import React, { useContext, useEffect, useMemo, useRef } from "react";

const MetadataRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
`

const MetadataRow = ({ rowName, value }: {  rowName: string, value: string }) => {

  return (
    <MetadataRowContainer>
      <text>{rowName}</text>
      <text>{value}</text>
    </MetadataRowContainer>
  )
}

const formatDollarValue = (value: number) => Intl.format(value, { code: 'CAD' })


export const MarketMetdataNoMemos = ({ marketData }: { marketData: MarketData}) => {

  const timeSpent = useRef(0);
  const lastTimeCapture = useRef(new Date().getTime());

  const formattedBid = formatDollarValue(marketData.bid);
  const formattedAsk = formatDollarValue(marketData.ask);
  const formattedLastSale = formatDollarValue(marketData.lastSale);
  const formattedMarketCap = formatDollarValue(marketData.marketCap);

  return (
    <>
      <MetadataRow
        rowName="Bid"
        value={formattedBid}
      />
      <MetadataRow
        rowName="Ask"
        value={formattedAsk}
      />
      <MetadataRow
        rowName="Bid Size"
        value={marketData.bidSize.toString()}
      />
      <MetadataRow
        rowName="Ask Size"
        value={marketData.askSize.toString()}
      />
      <MetadataRow
        rowName="Last Sale"
        value={formattedLastSale}
      />
      <MetadataRow
        rowName="Volume"
        value={marketData.volume.toString()}
      />
      <MetadataRow
        rowName="Market Cap"
        value={formattedMarketCap}
      />
    </>
  )

}


export const MarketMetdataWithMemos = React.memo(({ marketData }: { marketData: MarketData }) => {
  const formattedBid = useMemo(() => formatDollarValue(marketData.bid), [marketData.bid]);
  const formattedAsk = useMemo(() => formatDollarValue(marketData.ask), [marketData.ask]);
  const formattedLastSale = useMemo(() => formatDollarValue(marketData.lastSale), [marketData.lastSale]);
  const formattedMarketCap =  useMemo(() => formatDollarValue(marketData.marketCap), [marketData.marketCap]);

  return (
    <>
      <MetadataRow
        rowName="Bid"
        value={formattedBid}
      />
      <MetadataRow
        rowName="Ask"
        value={formattedAsk}
      />
      <MetadataRow
        rowName="Bid Size"
        value={useMemo(() => marketData.bidSize.toString(), [marketData.bidSize])}
      />
      <MetadataRow
        rowName="Ask Size"
        value={useMemo(() => marketData.askSize.toString(), [marketData.askSize])}
      />
      <MetadataRow
        rowName="Last Sale"
        value={formattedLastSale}
      />
      <MetadataRow
        rowName="Volume"
        value={useMemo(() => marketData.volume.toString(), [marketData.volume])}
      />
      <MetadataRow
        rowName="Market Cap"
        value={formattedMarketCap}
      />
    </>
  )

})