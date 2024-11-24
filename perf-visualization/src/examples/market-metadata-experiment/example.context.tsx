import { createContext, useCallback, useState } from "react";
import { experimentMetrics } from "../../metrics/tracking";

interface ExampleControlsValues {
  frequency: number;
  setFrequency: (newFrequencyMs: number) => void,
  historicalDays: number;
  setHistoricalDays: (amountOfDays: number) => void,
  restartExperiment: () => void;
}


const ExampleContextDefaults: ExampleControlsValues = {
  frequency: 500, // in milliseconds
  setFrequency: () => {},
  historicalDays: 30,
  setHistoricalDays: () => {},
  restartExperiment: () => {},
}


export const ExampleContext = createContext<ExampleControlsValues>(ExampleContextDefaults);

export const ExampleContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [ frequency, setFrequency] = useState(ExampleContextDefaults.frequency)
  const [ historicalDays, setHistoricalDays] = useState(ExampleContextDefaults.historicalDays)
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
      restartExperiment
    }}>
      {children}
    </ExampleContext.Provider>
  ) 
}
