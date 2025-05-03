"use client";
import React from "react"; // 6.9k (gzipped: 2.7k)
import useLocoScroll from "../hooks/useLocoScroll";
import { SmoothScrollContext } from "./SmoothScrollContext";

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const { locoScroll, progress } = useLocoScroll();

  return <SmoothScrollContext.Provider value={{ locoScroll, progress }}>{children}</SmoothScrollContext.Provider>;
};

SmoothScrollProvider.displayName = "SmoothScrollProvider";