// src/components/AnimatedBalance.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useAnimatedDelta(value, { ms = 1000 } = {}) {
  const prev = useRef(value);
  const [delta, setDelta] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let t;
    const a = Number(value);
    const b = Number(prev.current);
    if (Number.isFinite(a) && Number.isFinite(b) && a !== b) {
      const d = +(a - b).toFixed(2);
      setDelta(d);
      setShow(true);
      t = setTimeout(() => setShow(false), ms);
    }
    prev.current = value;
    return () => t && clearTimeout(t);
  }, [value, ms]);

  return { show, delta };
}

export default function AnimatedBalance({ value, ms = 1000, className = "" }) {
  const { show, delta } = useAnimatedDelta(value, { ms });

  return (
    <div
      className={`relative inline-block align-baseline tabular-nums ${className}`}
      style={{ lineHeight: 1 }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {show ? (
          <motion.span
            key="delta"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={delta > 0 ? "text-green-600" : "text-red-600"}
            style={{ position: "absolute", inset: 0, willChange: "transform,opacity" }}
          >
            {delta > 0 ? "+" : "-"}
            {Math.abs(delta).toFixed(2)}
          </motion.span>
        ) : (
          <motion.span
            key="base"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, willChange: "transform,opacity" }}
          >
            {Number(value).toFixed(2)}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Reserve layout space to prevent jitter during swap */}
      <span className="invisible">{!show ? Number(value).toFixed(2) : `+${Number(delta).toFixed(2)}`}</span>
    </div>
  );
}
