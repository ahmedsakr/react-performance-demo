import React from 'react';
import './App.css';
import { HighFrequencyRerenderExample } from './examples/high-frequency-rerenders';
import { GRAY_BORDER } from './colour-constants';


function App() {
  return (
    <div className="App" style={styles.root}>
      <HighFrequencyRerenderExample />
    </div>
  );
}

const styles = {
  root: {
    margin: '0px 16px 0px 16px',
    minHeight: '100vh',
    borderLeft: `solid 1px ${GRAY_BORDER}`,
    borderRight: `solid 1px ${GRAY_BORDER}`,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    rowGap: 8,
  }
}
export default App;
