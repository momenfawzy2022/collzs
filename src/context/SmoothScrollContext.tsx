import React, { createContext } from "react";
import LocomotiveScroll from "locomotive-scroll";

// Create context with proper type safety
export const SmoothScrollContext = createContext<{
  locoScroll: LocomotiveScroll | null;
  progress: number;
}>({
  locoScroll: null,
  progress: 0,
});

export const useSmoothScroll = () => React.useContext(SmoothScrollContext);

SmoothScrollContext.displayName = "SmoothScrollContext";