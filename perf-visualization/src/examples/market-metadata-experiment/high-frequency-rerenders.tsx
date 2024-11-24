import { Profiler, useCallback, useContext, useState } from "react"
import { ControlsBox } from "../../components/controls-box"
import { InteractiveExample } from "../../components/example-box"
import { ExperimentBox } from "../../components/experiment-box";
import { TrialBox } from "../../components/trial-box";
import { useExperimentClock } from "../experiment-clock";
import { MarketMetdataNoMemos, MarketMetdataWithMemos } from "./market-metadata.experiment";
import { generateMarketData } from "./data-generator";
import { experimentMetrics, MARKET_DATA_EXPERIMENT_NO_MEMO, MARKET_DATA_EXPERIMENT_WITH_MEMO, updateExperimentMetric } from "../../metrics/tracking";
import { ExampleContext, ExampleContextProvider } from "./example.context";
import { RerenderFequencyControl } from "./frequency.control";
import { HistoricalPerformanceDaysControl } from "./historical-window.control";

const HighFrequencyRerenderContent = () => {

  const { frequency, historicalDays, restartExperiment } = useContext(ExampleContext);
  const [marketData, setMarketData ] = useState(generateMarketData(0, historicalDays));
  useExperimentClock(frequency, () => setMarketData(generateMarketData(
    new Date().getTime() -  experimentMetrics.highFrequencyExperiment.trialStartTime,
    historicalDays
  )));


  const leadingTrial = experimentMetrics.highFrequencyExperiment.noMemosTrialTimeSpent < experimentMetrics.highFrequencyExperiment.withMemosTrialTimeSpent
    ? 'no-memos'
    : 'with-memos';
  return (
      <InteractiveExample>
        <h1>Example: High-Frequency Prop Changes</h1>
        <ControlsBox onReRunEvent={restartExperiment}>
          <RerenderFequencyControl />
          <HistoricalPerformanceDaysControl />
        </ControlsBox>
        <ExperimentBox>
          <TrialBox
            trialType="no-memo"
            currentlyLeading={leadingTrial === 'no-memos'}
            timeSpent={experimentMetrics.highFrequencyExperiment.noMemosTrialTimeSpent}
            renderCount={experimentMetrics.highFrequencyExperiment.noMemosTrialRenderCounter}>
            <Profiler id={MARKET_DATA_EXPERIMENT_NO_MEMO} onRender={updateExperimentMetric}>
              <MarketMetdataNoMemos marketData={marketData} />
            </Profiler>
          </TrialBox>
          <TrialBox
            trialType="with-memo"
            currentlyLeading={leadingTrial === 'with-memos'}
            timeSpent={experimentMetrics.highFrequencyExperiment.withMemosTrialTimeSpent}
            renderCount={experimentMetrics.highFrequencyExperiment.withMemosTrialRenderCounter}
          >
            <Profiler id={MARKET_DATA_EXPERIMENT_WITH_MEMO} onRender={updateExperimentMetric}>
              <MarketMetdataWithMemos marketData={marketData} />
            </Profiler>
          </TrialBox>
        </ExperimentBox>
      </InteractiveExample>

  )
}


export const HighFrequencyRerenderExample = () => (
  <ExampleContextProvider>
    <HighFrequencyRerenderContent />
  </ExampleContextProvider>
)