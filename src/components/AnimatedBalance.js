// src/components/AnimatedBalance.jsx
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RotatingNavText from "@/components/RotatingNavText";

export default function AnimatedBalance({
  value,
  holdMs = 1000,
  rotateMs = 300,
  className = "",
  snapDelayMs = 10,
}) {
  const prev = useRef(Number(value));
  const [trio, setTrio] = useState([
    Number(value).toFixed(2),
    Number(value).toFixed(2),
    Number(value).toFixed(2),
  ]);
  const [deltaColor, setDeltaColor] = useState("green"); // "green" | "red"
  const [rtKey, setRtKey] = useState(0);
  const rtRef = useRef(null);
  const timers = useRef([]);

  // ---- width measurement + animation ----
  const contentRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => {
      const w = el.getBoundingClientRect().width;
      setWidth(w);
    };

    // initial measure
    update();

    // watch for internal content size changes (rotations)
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [rtKey]); // re-measure after we remount RotatingNavText

  useEffect(() => {
    const next = Number(value);
    const prevVal = prev.current;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (Number.isFinite(next) && Number.isFinite(prevVal) && next !== prevVal) {
      const delta = +(next - prevVal).toFixed(2);
      const deltaStr = `${delta >= 0 ? "+" : "-"}${Math.abs(delta).toFixed(2)}`;
      const baseStr  = next.toFixed(2);
      const prevStr  = prevVal.toFixed(2);

      setDeltaColor(delta >= 0 ? "green" : "red");

      // 1) mount snapped to prev (index 0)
      setTrio([prevStr, deltaStr, baseStr]);
      setRtKey(k => k + 1);

      // 2) jump to delta (index 1), then later to base (index 2)
      timers.current.push(setTimeout(() => {
        rtRef.current?.jumpTo(1);
        timers.current.push(setTimeout(() => {
          rtRef.current?.jumpTo(2);
        }, rotateMs + holdMs));
      }, snapDelayMs));
    } else {
      const b = next.toFixed(2);
      setTrio([b, b, b]);
    }

    prev.current = next;
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [value, holdMs, rotateMs, snapDelayMs]);

  return (
    // Animate the wrapper's WIDTH so siblings slide smoothly.
    <motion.span
      className={`inline-block align-baseline tabular-nums ${className}`}
      style={{ lineHeight: 1, overflow: "hidden" }}
      // Animate from previous measured width to new width
      animate={{ width }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {/* Inner content is measured by ResizeObserver */}
      <span ref={contentRef} className="inline-block items-baseline">
        <RotatingNavText
          key={rtKey}
          ref={rtRef}
          texts={trio}
          auto={false}
          loop={false}
          splitBy="words"
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          staggerFrom="first"
          animatePresenceMode="popLayout"
          animatePresenceInitial={false}
          disableFirstAnimation
          mainClassName=""
          splitLevelClassName="inline-flex"
          elementLevelClassName="inline-block"
          deltaColor={deltaColor}
        />
      </span>
    </motion.span>
  );
}
