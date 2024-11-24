import { useEffect } from "react";

export const useExperimentClock = (
  frequency: number,
  updateExperimentState: () => void,
  experimentStatus: "running" | "paused",
) => {
  useEffect(() => {
    if (experimentStatus === "paused") return;

    const adjustedFrequency = Math.max(frequency, 5);
    const intervalId = setInterval(updateExperimentState, adjustedFrequency);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [experimentStatus, frequency, updateExperimentState]);
};
