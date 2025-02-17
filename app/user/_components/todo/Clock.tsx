"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-2xl font-bold">
      {format(time, "h:mm:ss a")}
    </div>
  );
}; 