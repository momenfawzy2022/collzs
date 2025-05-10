"use client";
import React, { createContext } from "react"; // 6.9k (gzipped: 2.7k)
import useLocoScroll from "../hooks/useLocoScroll";
import LocomotiveScroll from "locomotive-scroll"; // 6.9k (gzipped: 2.7k)

export const SmoothScrollContext = createContext<{ locoScroll: LocomotiveScroll | null; progress: number }>({
    locoScroll: null,
    progress: 0,
});

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const { locoScroll, progress } = useLocoScroll();

    return <SmoothScrollContext.Provider value={{ locoScroll, progress }}>{children}</SmoothScrollContext.Provider>;
};

export const useSmoothScroll = () => React.useContext(SmoothScrollContext);
SmoothScrollContext.displayName = "SmoothScrollContext";
SmoothScrollProvider.displayName = "Smooth Scroll Provider";
