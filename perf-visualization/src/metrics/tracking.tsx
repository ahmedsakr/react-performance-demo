interface ExperimentMetrics {
  trialStartTime: number;
  noMemosTrialTimeSpent: number;
  withMemosTrialTimeSpent: number;
}

interface AllExperimentMetrics {
  highFrequencyExperiment: ExperimentMetrics;
}


export const experimentMetrics: AllExperimentMetrics = {
  highFrequencyExperiment: {
    trialStartTime: new Date().getTime(),
    noMemosTrialTimeSpent: 0,
    withMemosTrialTimeSpent: 0,
  }
}

export const MARKET_DATA_EXPERIMENT_NO_MEMO = 'market-data-experiment-no-memo';
export const MARKET_DATA_EXPERIMENT_WITH_MEMO = 'market-data-experiment-with-memo';

export const updateExperimentMetric = (
  id: string,
  phase: string,
  actualTime: number
) => {
  if (id === MARKET_DATA_EXPERIMENT_NO_MEMO) {
    experimentMetrics.highFrequencyExperiment.noMemosTrialTimeSpent += actualTime;
  } else if (id === MARKET_DATA_EXPERIMENT_WITH_MEMO) {
    experimentMetrics.highFrequencyExperiment.withMemosTrialTimeSpent += actualTime;
  }
}