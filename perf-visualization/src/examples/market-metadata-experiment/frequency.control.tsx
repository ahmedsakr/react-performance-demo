import { useContext } from "react";
import { ControlInput } from "../../components/control-input";
import { ExampleContext } from "./example.context";

const MIN_FREQUENCY_MS = 50;
const MAX_FREQUENCY_MS = 2000;

export const RerenderFequencyControl = () => {

  const { frequency, setFrequency, restartExperiment } = useContext(ExampleContext);

  return (
    <ControlInput
      inputName={`Frequency [${MIN_FREQUENCY_MS}ms, ${MAX_FREQUENCY_MS}ms]`}
      inputValue={frequency.toString()}
      onInputChange={(value) => {
        if (value === '') {
          setFrequency(0);
          restartExperiment();
          return;
        }
        if (Number.isNaN(value)) return;


        setFrequency(parseInt(value))
        restartExperiment();
      }}
      onLoseFocus={() => {
        if (frequency <= MIN_FREQUENCY_MS) {
          setFrequency(MIN_FREQUENCY_MS);
          restartExperiment();
          return;
        }
        if (frequency > MAX_FREQUENCY_MS) {
          setFrequency(MAX_FREQUENCY_MS);
          restartExperiment();
          return;
        }
      }}
    />
  )

}