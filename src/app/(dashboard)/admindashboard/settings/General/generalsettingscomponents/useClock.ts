"use client";
import { useEffect, useState } from "react";

// Selected timezone e ekhon koyta baje, 30 second por por update hoy.
// Shuru te khali thake, jate server ar browser er moddhe mismatch na hoy.
export function useClock(timeZone: string) {
  const [text, setText] = useState("");

  useEffect(() => {
    const format = () => {
      try {
        return new Intl.DateTimeFormat("en-US", {
          timeZone,
          weekday: "short",
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date());
      } catch {
        return "";
      }
    };
    setText(format());
    const id = setInterval(() => setText(format()), 30000);
    return () => clearInterval(id);
  }, [timeZone]);

  return text;
}