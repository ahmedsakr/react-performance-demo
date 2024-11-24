import React from "react"
import { GRAY_BORDER, NEAR_BLACK, SOFT_GRAY_BG } from "../colour-constants";
import styled from "styled-components";

interface TrialBoxProps {
  trialType: 'no-memo' | 'with-memo';
  timeSpent: number;
  renderCount: number;
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

const PaddedTrial = styled.div`
  padding: 32px 16px 32px 16px;
  border: solid 2px black;
`

const Bolded = styled.text`
  font-weight: 700;
`

export const TrialBox = ({  trialType, timeSpent, children, renderCount }: TrialBoxProps) => {

  return (
    <RootBox>
      <text>Trial: <Bolded>{trialType === 'no-memo' ? 'No Memos' : 'With Memos'}</Bolded></text>
      <Bolded>Time spent: {timeSpent} ms, render count: {renderCount} </Bolded>
      <PaddedTrial>
        {children}
      </PaddedTrial>
    </RootBox>
  )
}
