import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp";

type KpiProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** divide by 1000 and show "K" — for big soles figures */
  thousands?: boolean;
  tone?: "gold" | "emerald" | "cream";
  big?: boolean;
};

const TONE: Record<string, string> = {
  gold: "#D4AF37",
  emerald: "#10B981",
  cream: "#F3E9DC",
};

export function Kpi({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  thousands = false,
  tone = "gold",
  big = false,
}: KpiProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const display = thousands ? value / 1000 : value;
  const animated = useCountUp(display, {
    decimals: thousands ? 1 : decimals,
    start: inView,
  });

  const text =
    prefix +
    animated.toLocaleString("es-PE", {
      minimumFractionDigits: thousands ? 1 : decimals,
      maximumFractionDigits: thousands ? 1 : decimals,
    }) +
    (thousands ? "K" : "") +
    suffix;

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-soft/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6"
    >
      <div
        className={`font-display font-black tabular-nums ${
          big ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"
        }`}
        style={{ color: TONE[tone] }}
      >
        {text}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-soft/50">
        {label}
      </div>
    </div>
  );
}
