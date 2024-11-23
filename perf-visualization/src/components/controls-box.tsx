import React from "react"
import { GRAY_BORDER, LIGHT_ORANGE_BG, SOFT_GRAY_BG } from "../colour-constants";
import styled from "styled-components";

interface ControlsBoxProps {
  children: React.ReactNode;
}

const RootBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${LIGHT_ORANGE_BG};
    padding: 16px;
    border: dotted 2px ${GRAY_BORDER};
    border-radius: 20px;
    width: auto;
`;


const StartAlign = styled.div`
  align-self: start;
  font-weight: 700;
`;
const PaddedControls = styled.div`
  padding: 16px;
`

const ControlsIcon = () => <StartAlign>🔧 Controls</StartAlign>

export const ControlsBox = ({  children }: ControlsBoxProps) => {

  return (
    <RootBox>
      <ControlsIcon />
      <PaddedControls>
        {children}
      </PaddedControls>
    </RootBox>
  )
}
