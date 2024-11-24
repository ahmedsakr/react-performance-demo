import { useEffect } from "react";

export const useExperimentClock = (
  frequency: number,
  updateExperimentState: () => void,
) => {
  useEffect(() => {
    const adjustedFrequency = Math.max(frequency, 5);
    const intervalId = setInterval(updateExperimentState, adjustedFrequency);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [frequency, updateExperimentState]);
};
