import React from "react";
import { GRAY_BORDER, SOFT_GRAY_BG } from "../colour-constants";
import styled from "styled-components";
import Decimal from "decimal.js";

interface TrialBoxProps {
  trialType: "no-memo" | "with-memo";
  trialUrl: string;
  timeSpent: number;
  renderCount: number;
  currentlyLeading: boolean;
  leadPercent: Decimal;
  children: React.ReactNode;
}

const RootBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${SOFT_GRAY_BG};
  padding: 16px;
  border: dotted 2px ${GRAY_BORDER};
  border-radius: 20px;
  row-gap: 8px;
`;

const PaddedTrial = styled.div`
  padding: 32px 16px 32px 16px;
  border: solid 2px black;
`;

const Bolded = styled.text`
  font-weight: 700;
`;

const TrialHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TrialBox = ({
  trialType,
  trialUrl,
  currentlyLeading,
  leadPercent,
  timeSpent,
  children,
  renderCount,
}: TrialBoxProps) => {
  return (
    <RootBox>
      <TrialHeader>
        <text>
          Trial:{" "}
          <a href={trialUrl} target="_blank">
            <Bolded>
              {trialType === "no-memo" ? "No Memos" : "With Memos"}
            </Bolded>
          </a>
        </text>
        {currentlyLeading && (
          <text>🥇Winning by {leadPercent.toDecimalPlaces(2).toString()}%</text>
        )}
      </TrialHeader>
      <Bolded>
        Time spent: {new Decimal(timeSpent).toDecimalPlaces(2).toNumber()} ms,
        render count: {renderCount}{" "}
      </Bolded>
      <PaddedTrial>{children}</PaddedTrial>
    </RootBox>
  );
};
