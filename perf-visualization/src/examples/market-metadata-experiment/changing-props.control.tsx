import { useContext } from "react";
import { ExampleContext, ExampleControlsValues } from "./example.context";
import { ControlCheckboxes } from "../../components/control-checkbox";

const CHECKBOX_OPTIONS = [
  {
    id: "bid",
    text: "Bid",
  },
  {
    id: "ask",
    text: "Ask",
  },
  {
    id: "bidSize",
    text: "Bid size",
  },
  {
    id: "askSize",
    text: "Ask size",
  },
  {
    id: "lastSale",
    text: "Last sale",
  },
  {
    id: "marketCap",
    text: "Market cap",
  },
  {
    id: "volume",
    text: "Volume",
  },
  {
    id: "historicalPerformance",
    text: "Historical performance",
  },
] as const;

export const ChangingPropsControl = () => {
  const { changingProps, updateChangingProps, restartExperiment } =
    useContext(ExampleContext);

  const propsWithSelected = CHECKBOX_OPTIONS.map((option) => ({
    ...option,
    selected: changingProps[option.id],
  }));

  return (
    <ControlCheckboxes
      inputName={`Props configured to change`}
      options={propsWithSelected}
      onSelect={(inputId: keyof ExampleControlsValues["changingProps"]) => {
        updateChangingProps(inputId, !changingProps[inputId]);
        restartExperiment();
      }}
    />
  );
};
