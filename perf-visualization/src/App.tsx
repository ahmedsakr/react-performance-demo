import React from "react";
import "./App.css";
import { HighFrequencyRerenderExample } from "./examples/market-metadata-experiment/high-frequency-rerenders";
import styled from "styled-components";
import { SMALL_SCREEN_BREAKPOINT } from "./breakpoints";

const AppRoot = styled.div`
  margin: 0px 16px 0px 16px;
  minheight: 100vh;
  display: flex;
  flex-direction: column;
  alignitems: center;
  row-gap: 16px;

  @media only screen and (max-width: ${SMALL_SCREEN_BREAKPOINT}) {
    max-width: 80%;
    margin-left: 10%;
  }

  @media only screen and (min-width: ${SMALL_SCREEN_BREAKPOINT}) {
    max-width: 50%;
    margin-left: 25%;
  }
`;

function App() {
  return (
    <AppRoot>
      <HighFrequencyRerenderExample />
    </AppRoot>
  );
}

export default App;
