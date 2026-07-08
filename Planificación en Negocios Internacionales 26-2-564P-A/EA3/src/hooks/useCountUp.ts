import { useEffect, useRef, useState } from "react";

type Opts = {
  duration?: number;
  decimals?: number;
  /** start the animation only when this becomes true */
  start?: boolean;
};

/**
 * Counts up from 0 to `target` once `start` is true. Respects
 * prefers-reduced-motion (snaps straight to target).
 */
export function useCountUp(
  target: number,
  { duration = 1600, decimals = 0, start = true }: Opts = {}
) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!start || doneRef.current) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      setValue(target);
      doneRef.current = true;
      return;
    }

    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(target * ease(p));
      if (p < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        doneRef.current = true;
      }
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, start]);

  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
