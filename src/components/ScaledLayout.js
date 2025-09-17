"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";

export function ScaledLayout({
  baseWidth = 960,
  children,
  overlay = null,
  className = "",
  quantizeToDPR = true,       // toggle crisp-vs-exact
  epsilon = 0.0005,           // ignore micro-changes
}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // rAF batching so we can update as frequently as frames render, but only once per tick
  const rafIdRef = useRef(0);
  const lastWRef = useRef(-1);

  const measure = (entry) => {
    // 1) Use the most precise width available from ResizeObserver
    let cssPxWidth;
    if (entry?.devicePixelContentBoxSize) {
      // device pixels -> convert back to CSS px
      const dpc = Array.isArray(entry.devicePixelContentBoxSize)
        ? entry.devicePixelContentBoxSize[0]
        : entry.devicePixelContentBoxSize;
      cssPxWidth = dpc.inlineSize / (window.devicePixelRatio || 1);
    } else if (entry?.contentBoxSize) {
      const cb = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize;
      cssPxWidth = cb.inlineSize; // already CSS px
    } else if (entry?.contentRect) {
      cssPxWidth = entry.contentRect.width;
    } else if (outerRef.current) {
      // fallback (fractional too)
      cssPxWidth = outerRef.current.getBoundingClientRect().width;
    } else {
      cssPxWidth = 0;
    }

    // Skip if width hasn’t really changed
    if (Math.abs(cssPxWidth - lastWRef.current) < 0.01) return;
    lastWRef.current = cssPxWidth;

    const raw = cssPxWidth / baseWidth;
    const dpr = window.devicePixelRatio || 1;
    const next = quantizeToDPR ? Math.round(raw * dpr) / dpr : raw;

    if (Math.abs(next - scale) > epsilon) {
      setScale(next);
      // Keep outer height in sync with the scaled inner height
      if (outerRef.current && innerRef.current) {
        const unscaledH = innerRef.current.offsetHeight || 0;
        outerRef.current.style.height = `${unscaledH * next}px`;
      }
    }
  };

  useLayoutEffect(() => {
    if (!outerRef.current) return;

    const ro = new ResizeObserver((entries) => {
      // Batch to the next frame for smoother/”more frequent” updates
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => measure(entries[0]));
    });

    ro.observe(outerRef.current);

    // Also observe the inner content to recalc height when its natural size changes
    if (innerRef.current) ro.observe(innerRef.current);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      ro.disconnect();
    };
  }, [baseWidth, quantizeToDPR, epsilon]);

  // VisualViewport: reacts to pinch-zoom and on-screen keyboard
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onVV = () => {
      // re-measure based on current size
      const rect = outerRef.current?.getBoundingClientRect();
      if (!rect) return;
      measure(undefined); // will fall back to getBoundingClientRect
    };
    vv.addEventListener("resize", onVV);
    vv.addEventListener("scroll", onVV); // keyboard slide
    return () => {
      vv.removeEventListener("resize", onVV);
      vv.removeEventListener("scroll", onVV);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        ["--scale"]: scale, // for overlay positioning
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: baseWidth,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          willChange: "transform",
        }}
      >
        {children}
      </div>

      {overlay && (
        <div style={{ position: "absolute", inset: 0 }} className="pointer-events-none">
          {overlay}
        </div>
      )}
    </div>
  );
}
