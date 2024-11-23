import { createContext, useState } from "react";

interface ExperimentMetrics {
  noMemosTrialTimeSpent: number;
  setNoMemosTrialTimeSpent: (newTimeSpent: number) => void;
  withMemosTrialTimeSpent: number;
  setWithMemosTrialTimeSpent: (newTimeSpent: number) => void;
}

interface AllExperimentMetrics {
  highFrequencyExperiment: ExperimentMetrics;
}

const EXPERIMENT_METRICS_CONTEXT_DEFAULT: AllExperimentMetrics = {
  highFrequencyExperiment: {
    noMemosTrialTimeSpent: 0,
    setNoMemosTrialTimeSpent: () => {},
    withMemosTrialTimeSpent: 0,
    setWithMemosTrialTimeSpent: () => {},
  }

}
export const ExperimentMetricsContext = createContext<AllExperimentMetrics>(EXPERIMENT_METRICS_CONTEXT_DEFAULT)


const useExperimentMetrics = () => {

  const [noMemosTrialTimeSpent, setNoMemosTrialTimeSpent ] = useState(0);
  const [ withMemosTrialTimeSpent, setWithMemosTrialTimeSpent ] = useState(0);

  return {
    noMemosTrialTimeSpent,
    withMemosTrialTimeSpent,
    setNoMemosTrialTimeSpent,
    setWithMemosTrialTimeSpent
  }
}

export const ExperimentMetricsContextProvider = ({ children }: { children: React.ReactNode }) => {

  const highFrequencyExperiment = useExperimentMetrics()

  return (
    <ExperimentMetricsContext.Provider value={{
      highFrequencyExperiment
    }}>
      {children}
    </ExperimentMetricsContext.Provider>
  )
}