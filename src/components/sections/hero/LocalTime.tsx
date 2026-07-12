"use client";

import { useEffect, useState } from "react";

interface LocalTimeProps {
  timeZone: string;
}

/**
 * Live studio clock for the hero status line. Renders a placeholder on
 * the server and ticks once hydrated — a small, honest signal that the
 * page itself is a running system.
 */
export default function LocalTime({ timeZone }: LocalTimeProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}
