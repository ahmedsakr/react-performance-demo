import { createContext, Profiler, useCallback, useContext, useState } from "react"
import { ControlsBox } from "../../components/controls-box"
import { InteractiveExample } from "../../components/example-box"
import { ControlInput } from "../../components/control-input";
import { ExperimentBox } from "../../components/experiment-box";
import { TrialBox } from "../../components/trial-box";
import { useExperimentClock } from "../experiment-clock";
import { MarketMetdataNoMemos, MarketMetdataWithMemos } from "./market-metadata.experiment";
import { generateMarketData } from "./data-generator";
import { experimentMetrics, MARKET_DATA_EXPERIMENT_NO_MEMO, MARKET_DATA_EXPERIMENT_WITH_MEMO, updateExperimentMetric } from "../../metrics/tracking";


interface ExampleControlsValues {
  frequency: number;
  setFrequency: (newFrequencyMs: number) => void,
}


const ExampleContextDefaults: ExampleControlsValues = {
  frequency: 500, // in milliseconds
  setFrequency: () => {},
}

const MIN_FREQUENCY_MS = 50;
const MAX_FREQUENCY_MS = 2000;

const ExampleContext = createContext<ExampleControlsValues>(ExampleContextDefaults);

const ExampleContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [ frequency, setFrequency] = useState(ExampleContextDefaults.frequency)

  return (
    <ExampleContext.Provider value={{
      frequency,
      setFrequency
    }}>
      {children}
    </ExampleContext.Provider>
  ) 
}

const RerenderFequencyControl = () => {

  const { frequency, setFrequency } = useContext(ExampleContext);


  return (
    <ControlInput
      inputName="Frequency [50ms, 2000ms]"
      inputValue={frequency.toString()}
      onInputChange={(value) => {
        if (value === '') {
          setFrequency(0);
          return;
        }
        if (Number.isNaN(value)) return;


        setFrequency(parseInt(value))
      }}
      onLoseFocus={() => {
        if (frequency <= MIN_FREQUENCY_MS) {
          setFrequency(MIN_FREQUENCY_MS);
          return;
        }
        if (frequency > MAX_FREQUENCY_MS) {
          setFrequency(MAX_FREQUENCY_MS);
          return;
        }
      }}
    />
  )

}

const HighFrequencyRerenderContent = () => {

  const { frequency } = useContext(ExampleContext);
  const [marketData, setMarketData ] = useState(generateMarketData(0));
  useExperimentClock(frequency, () => setMarketData(generateMarketData(new Date().getTime() -  experimentMetrics.highFrequencyExperiment.trialStartTime)));

  const restartExperiment = useCallback(() => {
   experimentMetrics.highFrequencyExperiment.noMemosTrialTimeSpent = 0;
   experimentMetrics.highFrequencyExperiment.noMemosTrialRenderCounter = 0;
   experimentMetrics.highFrequencyExperiment.withMemosTrialTimeSpent = 0;
   experimentMetrics.highFrequencyExperiment.withMemosTrialRenderCounter = 0;
   experimentMetrics.highFrequencyExperiment.trialStartTime = new Date().getTime();
  }, []);


  return (
      <InteractiveExample>
        <h1>Example: High-Frequency Prop Changes</h1>
        <ControlsBox onReRunEvent={restartExperiment}>
          <RerenderFequencyControl />
        </ControlsBox>
        <ExperimentBox>
          <TrialBox trialType="no-memo" timeSpent={experimentMetrics.highFrequencyExperiment.noMemosTrialTimeSpent} renderCount={experimentMetrics.highFrequencyExperiment.noMemosTrialRenderCounter}>
            <Profiler id={MARKET_DATA_EXPERIMENT_NO_MEMO} onRender={updateExperimentMetric}>
              <MarketMetdataNoMemos marketData={marketData} />
            </Profiler>
          </TrialBox>
          <TrialBox trialType="with-memo" timeSpent={experimentMetrics.highFrequencyExperiment.withMemosTrialTimeSpent} renderCount={experimentMetrics.highFrequencyExperiment.withMemosTrialRenderCounter}>
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