import { useContext } from "react";
import { ControlInput } from "../../components/control-input";
import { ExampleContext } from "./example.context";

const MIN_HISTORICAL_DAYS = 2;
const MAX_HISTORICAL_DAYS = 365;

export const HistoricalPerformanceDaysControl = () => {
  const { historicalDays, setHistoricalDays, restartExperiment } =
    useContext(ExampleContext);

  return (
    <ControlInput
      inputName={`Performance Window [${MIN_HISTORICAL_DAYS} days, ${MAX_HISTORICAL_DAYS} days]`}
      inputValue={historicalDays.toString()}
      onInputChange={(value) => {
        if (value === "") {
          setHistoricalDays(0);
          restartExperiment();
          return;
        }
        if (value.length > 4) return;
        if (Number.isNaN(value)) return;

        setHistoricalDays(parseInt(value));
        restartExperiment();
      }}
      onLoseFocus={() => {
        if (historicalDays <= MIN_HISTORICAL_DAYS) {
          setHistoricalDays(MIN_HISTORICAL_DAYS);
          restartExperiment();
          return;
        }
        if (historicalDays > MAX_HISTORICAL_DAYS) {
          setHistoricalDays(MAX_HISTORICAL_DAYS);
          restartExperiment();
          return;
        }
      }}
    />
  );
};
