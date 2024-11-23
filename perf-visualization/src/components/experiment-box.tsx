import React from "react"
import { GRAY_BORDER, NEAR_BLACK, SOFT_GRAY_BG } from "../colour-constants";
import styled from "styled-components";

interface ExperimentBoxProps {
  children: React.ReactNode;
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
const PaddedExperiment = styled.div`
  padding: 32px 16px 32px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`

export const ExperimentBox = ({  children }: ExperimentBoxProps) => {

  return (
    <RootBox>
      <StartAlign>
        <text>🔧 Live Experiment</text>
      </StartAlign>
      <text>Description: The table below is market metadata of a security.</text>
      <text>All values are subject to change when a new market quote is available</text>
      <PaddedExperiment>
        {children}
      </PaddedExperiment>
    </RootBox>
  )
}
