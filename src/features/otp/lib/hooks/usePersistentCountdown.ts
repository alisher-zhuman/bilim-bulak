import { useCallback, useEffect, useMemo, useState } from "react";

interface Options {
  key: string;
  durationSec: number;
}

export const usePersistentCountdown = ({ key, durationSec }: Options) => {
  const [expireAt, setExpireAt] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem(key);
    const parsed = raw ? Number(raw) : NaN;

    if (!raw || Number.isNaN(parsed)) {
      const next = Date.now() + durationSec * 1000;
      localStorage.setItem(key, String(next));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpireAt(next);
      return;
    }

    setExpireAt(parsed);
  }, [key, durationSec]);

  useEffect(() => {
    if (!expireAt) return;

    const calc = () => {
      const diffMs = expireAt - Date.now();
      const sec = Math.max(0, Math.ceil(diffMs / 1000));
      setSecondsLeft(sec);
    };

    calc();

    const id = window.setInterval(calc, 250);

    return () => window.clearInterval(id);
  }, [expireAt]);

  const isExpired = secondsLeft <= 0;

  const restart = useCallback(() => {
    const next = Date.now() + durationSec * 1000;
    localStorage.setItem(key, String(next));
    setExpireAt(next);
  }, [key, durationSec]);

  const mmss = useMemo(() => {
    const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const s = String(secondsLeft % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, [secondsLeft]);

  return { secondsLeft, mmss, isExpired, restart };
};
