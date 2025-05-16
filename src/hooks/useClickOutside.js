"use client";
import { useEffect, useRef } from "react";

export default function useClickOutside(
  handler,
  events = ["click"],
  nodes = []
) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside =
        ref.current &&
        !ref.current.contains(event.target) &&
        !nodes.some((node) => node?.contains(event.target));
      if (isOutside) {
        handler();
      }
    };

    events.forEach((event) => {
      document.addEventListener(event, handleClickOutside);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleClickOutside);
      });
    };
  }, [handler, events, nodes]);

  return ref;
}
