import { createContext, useCallback, useContext, useState } from "react"
import { ControlsBox } from "../../components/controls-box"
import { InteractiveExample } from "../../components/example-box"
import { ControlInput } from "../../components/control-input";
import { ExperimentBox } from "../../components/experiment-box";
import { TrialBox } from "../../components/trial-box";
import { ExperimentMetricsContext } from "../../metrics/context";
import { useExperimentClock } from "../experiment-clock";
import { MarketMetdataNoMemos } from "./market-metadata.experiment";
import { generateMarketData } from "./data-generator";


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

export const HighFrequencyRerenderExample = () => {

  const { highFrequencyExperiment } = useContext(ExperimentMetricsContext);
  const { frequency } = useContext(ExampleContext);
  const [marketData, setMarketData ] = useState(generateMarketData(0));
  const [experimentStartTime, setExperimentStartTime ] = useState(new Date().getTime())
  useExperimentClock(frequency, () => setMarketData(generateMarketData(new Date().getTime() -  experimentStartTime)));

  const restartExperiment = useCallback(() => {
    highFrequencyExperiment.setNoMemosTrialTimeSpent(0);
    highFrequencyExperiment.setWithMemosTrialTimeSpent(0);
    setExperimentStartTime(new Date().getTime())
  }, [highFrequencyExperiment]);


  return (
    <ExampleContextProvider>
      <InteractiveExample>
        <h1>Example: High-Frequency Prop Changes</h1>
        <ControlsBox onReRunEvent={restartExperiment}>
          <RerenderFequencyControl />
        </ControlsBox>
        <ExperimentBox>
          <TrialBox trialType="no-memo" timeSpent={highFrequencyExperiment.noMemosTrialTimeSpent}>
            <MarketMetdataNoMemos marketData={marketData} />
          </TrialBox>
          <TrialBox trialType="with-memo" timeSpent={highFrequencyExperiment.withMemosTrialTimeSpent}>
            <MarketMetdataNoMemos marketData={marketData} />
          </TrialBox>
        </ExperimentBox>
      </InteractiveExample>
    </ExampleContextProvider>

  )
}