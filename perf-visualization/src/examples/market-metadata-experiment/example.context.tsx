import { createContext, useCallback, useState } from "react";
import { experimentMetrics } from "../../metrics/tracking";

export interface ExampleControlsValues {
  frequency: number;
  setFrequency: (newFrequencyMs: number) => void,
  historicalDays: number;
  setHistoricalDays: (amountOfDays: number) => void,
  changingProps: {
    bid: boolean,
    ask: boolean,
    bidSize: boolean,
    askSize: boolean,
    lastSale: boolean,
    marketCap: boolean,
    volume: boolean,
    historicalPerformance: boolean,
  },
  updateChangingProps: (prop: string, newValue: boolean) => void,
  restartExperiment: () => void;
}


const ExampleContextDefaults: ExampleControlsValues = {
  frequency: 500, // in milliseconds
  setFrequency: () => {},
  historicalDays: 30,
  setHistoricalDays: () => {},
  changingProps: {
    bid: true,
    ask: true,
    bidSize: true,
    askSize: true,
    lastSale: true,
    marketCap: true,
    volume: true,
    historicalPerformance: true,
  },
  updateChangingProps: () => {},
  restartExperiment: () => {},
}


export const ExampleContext = createContext<ExampleControlsValues>(ExampleContextDefaults);

export const ExampleContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [ frequency, setFrequency] = useState(ExampleContextDefaults.frequency)
  const [ historicalDays, setHistoricalDays] = useState(ExampleContextDefaults.historicalDays)

  const [ changingProps, updateChangingProps] = useState(ExampleContextDefaults.changingProps)

  const restartExperiment = useCallback(() => {
    experimentMetrics.highFrequencyExperiment.noMemosTrialTimeSpent = 0;
    experimentMetrics.highFrequencyExperiment.noMemosTrialRenderCounter = 0;
    experimentMetrics.highFrequencyExperiment.withMemosTrialTimeSpent = 0;
    experimentMetrics.highFrequencyExperiment.withMemosTrialRenderCounter = 0;
    experimentMetrics.highFrequencyExperiment.trialStartTime = new Date().getTime();
   }, []);
 
  return (
    <ExampleContext.Provider value={{
      frequency,
      setFrequency,
      historicalDays,
      setHistoricalDays,
      restartExperiment,
      changingProps,
      updateChangingProps: (propId, newValue) => {
        updateChangingProps({ ...changingProps, [propId]: newValue });
      },
    }}>
      {children}
    </ExampleContext.Provider>
  ) 
}
