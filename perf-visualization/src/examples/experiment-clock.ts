import { useEffect, useState } from "react"

export const useExperimentClock = (frequency: number, updateExperimentState: () => void) => {

  useEffect(() => {

    const adjustedFrequency = Math.max(frequency, 50);
    const intervalId = setInterval(updateExperimentState, adjustedFrequency);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [frequency, updateExperimentState])
}