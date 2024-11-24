import React from "react"
import { GRAY_BORDER, LIVE_RED, SOFT_GRAY_BG } from "../colour-constants";
import styled from "styled-components";
import Decimal from "decimal.js";

interface ExperimentBoxProps {
  children: React.ReactNode;
  time: number;
}

const RootBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${SOFT_GRAY_BG};
    padding: 16px;
    border: dotted 2px ${GRAY_BORDER};
    border-radius: 20px;
    width: auto;
    row-gap: 16px;
`;


const StartAlign = styled.div`
  align-self: start;
  font-weight: 700;
`;
const RunningTime = styled.text`
  color: ${LIVE_RED};
  padding-left: 4px;
`
const PaddedExperiment = styled.div`
  padding: 32px 16px 32px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`

export const ExperimentBox = ({  children, time }: ExperimentBoxProps) => {
  const withTimeFormatting = (value: number) => value < 10 ? `0${value}` : value.toString(); 
  const timeMinutes = withTimeFormatting(new Decimal(time).div(1000).div(60).floor().toNumber());
  const timeSeconds = withTimeFormatting(new Decimal(time).div(1000).mod(60).floor().toNumber());

  return (
    <RootBox>
      <StartAlign>
        <text>🔧 Live Experiment</text>
        <RunningTime>{timeMinutes}:{timeSeconds}</RunningTime>
      </StartAlign>
      <text>Description: The table below is market metadata of a security.</text>
      <text>All values are subject to change when a new market quote is available</text>
      <PaddedExperiment>
        {children}
      </PaddedExperiment>
    </RootBox>
  )
}
