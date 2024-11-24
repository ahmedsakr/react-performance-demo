import React from "react";
import {
  GRAY_BORDER,
  LIGHT_GREEN,
  LIVE_RED,
  NEAR_BLACK,
  SOFT_GRAY_BG,
} from "../colour-constants";
import styled from "styled-components";
import Decimal from "decimal.js";

interface ExperimentBoxProps {
  children: React.ReactNode;
  time: number;
  experimentStatus: "running" | "paused";
  onReRunEvent: () => void;
  pauseExperiment: () => void;
  resumeExperiment: () => void;
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
`;
const PaddedExperiment = styled.div`
  padding: 32px 16px 32px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const ActionButton = styled.input`
  color: white;
  align-self: start;
  border-radius: 20px;
  border: none;
  padding: 8px;
`;

const ReRunButton = styled(ActionButton)`
  background-color: ${NEAR_BLACK};
`;

const ExperimentControlButton = styled(ActionButton)<{
  currentStatus: "running" | "paused";
}>`
  background-color: ${({ currentStatus }) =>
    currentStatus === "running" ? LIVE_RED : LIGHT_GREEN};
  margin-left: 4px;
`;

export const ExperimentBox = ({
  children,
  time,
  onReRunEvent,
  experimentStatus,
  pauseExperiment,
  resumeExperiment,
}: ExperimentBoxProps) => {
  const withTimeFormatting = (value: number) =>
    value < 10 ? `0${value}` : value.toString();
  const timeMinutes = withTimeFormatting(
    new Decimal(time).div(1000).div(60).floor().toNumber(),
  );
  const timeSeconds = withTimeFormatting(
    new Decimal(time).div(1000).mod(60).floor().toNumber(),
  );

  const isRunning = experimentStatus === "running";

  return (
    <RootBox>
      <StartAlign>
        <text>🔧 Live Experiment</text>
        <RunningTime>
          {timeMinutes}:{timeSeconds}
        </RunningTime>
      </StartAlign>
      <StartAlign>
        <ReRunButton type="button" onClick={onReRunEvent} value="Re-run" />
        <ExperimentControlButton
          currentStatus={experimentStatus}
          type="button"
          onClick={isRunning ? pauseExperiment : resumeExperiment}
          value={isRunning ? "Pause" : "Resume"}
        />
      </StartAlign>
      <text>
        Description: The table below is market metadata of a security.
      </text>
      <text>
        All values are subject to change when a new market quote is available
      </text>
      <PaddedExperiment>{children}</PaddedExperiment>
    </RootBox>
  );
};
