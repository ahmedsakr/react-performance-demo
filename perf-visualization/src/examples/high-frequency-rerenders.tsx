import { createContext, useContext, useState } from "react"
import { ControlsBox } from "../components/controls-box"
import { InteractiveExample } from "../components/example-box"
import { ControlInput } from "../components/control-input";
import { ExperimentBox } from "../components/experiment-box";


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


  return (
    <ExampleContextProvider>
      <InteractiveExample>
        <h1>Example: High-Frequency Prop Changes</h1>
        <ControlsBox onReRunEvent={() => {}}>
          <RerenderFequencyControl />
        </ControlsBox>
        <ExperimentBox>
          hello
        </ExperimentBox>
      </InteractiveExample>
    </ExampleContextProvider>

  )
}