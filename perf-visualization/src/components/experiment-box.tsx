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
`;


const StartAlign = styled.div`
  align-self: start;
  font-weight: 700;
`;
const PaddedExperiment = styled.div`
  padding: 32px 16px 32px 16px;
`

const ReRunButton = styled.input`
  background-color: ${NEAR_BLACK};
  color: white;
  align-self: start;
  border-radius: 20px;
  border: none;
  padding: 8px;
`

export const ExperimentBox = ({  children }: ExperimentBoxProps) => {

  return (
    <RootBox>
      <StartAlign>
        🔧 Live Experiment
      </StartAlign>
      <PaddedExperiment>
        {children}
      </PaddedExperiment>
    </RootBox>
  )
}
