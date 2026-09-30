import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Format with Indian digit grouping (1,800). */
  format?: boolean;
}

/** Animates a number from 0 to `value` the first time it enters the viewport. */
export function CountUp({ value, duration = 1600, decimals = 0, prefix = "", suffix = "", format = false }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(() => (format ? "0" : (0).toFixed(decimals)));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fmt = (n: number) => {
      if (format) {
        return n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      }
      return n.toFixed(decimals);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(fmt(value));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          setDisplay(fmt(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, decimals, format]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
