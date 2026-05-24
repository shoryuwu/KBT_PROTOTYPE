import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetHours?: number;
  targetMinutes?: number;
  targetSeconds?: number;
}

export function CountdownTimer({ targetHours = 6, targetMinutes = 57, targetSeconds = 42 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(targetHours * 3600 + targetMinutes * 60 + targetSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const h = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');

  const Digit = ({ value }: { value: string }) => (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[3rem] text-center">
      <span className="text-2xl font-mono font-black text-white tracking-wider">{value}</span>
    </div>
  );

  const Colon = () => (
    <span className="text-2xl font-black text-white/80 -mx-0.5 animate-pulse-slow">:</span>
  );

  return (
    <div className="flex items-center gap-1.5">
      <Digit value={h} />
      <Colon />
      <Digit value={m} />
      <Colon />
      <Digit value={s} />
    </div>
  );
}
