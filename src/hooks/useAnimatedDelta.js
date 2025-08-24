import { useEffect, useRef, useState } from "react";

export function useAnimatedDelta(value, { ms = 1000 } = {}) {
  const prev = useRef(value);
  const [delta, setDelta] = useState(0);
  const [show, setShow] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    const a = Number(value);
    const b = Number(prev.current);
    if (Number.isFinite(a) && Number.isFinite(b) && a !== b) {
      const d = +(a - b).toFixed(2); // clamp to 2dp
      setDelta(d);
      setShow(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setShow(false), ms);
    }
    prev.current = value;
    return () => clearTimeout(timer.current);
  }, [value, ms]);

  return { show, delta };
}
