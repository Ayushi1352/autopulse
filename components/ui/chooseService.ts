"use client";

import { useEffect } from "react";

const EVENT = "autopulse:choose-service";

/** Tells the booking form which service was picked in the Services list (the link itself scrolls to the form) */
export const chooseService = (service: string) => window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: service }));

/** The booking form's side: runs `onChoose` with the service picked in the Services list */
export const useChosenService = (onChoose: (service: string) => void) => {
  useEffect(() => {
    const listener = (event: Event) => onChoose((event as CustomEvent<string>).detail);
    window.addEventListener(EVENT, listener);
    return () => window.removeEventListener(EVENT, listener);
  }, [onChoose]);
};
