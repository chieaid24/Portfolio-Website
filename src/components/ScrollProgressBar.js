"use client";
import { useEffect, useState } from "react";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return isDesktop;
}

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isDesktop = useIsDesktop();

  // Only attach scroll handlers on desktop
  useEffect(() => {
    if (!isDesktop) return;
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setIsVisible(currentScroll > 0);

      const trackHeight = window.innerHeight - 64 - 16; // h-16 + 16px bottom pad
      const progress =
        totalHeight > 0 ? (currentScroll / totalHeight) * trackHeight : 0;
      setScrollProgress(Math.min(trackHeight, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDesktop]);

  // Hide native scrollbar **only on desktop**
  useEffect(() => {
    if (!isDesktop) return;
    const style = document.createElement("style");
    style.textContent = `
      /* Chrome/Safari/Opera */
      ::-webkit-scrollbar { display: none; }
      /* IE/Edge/Firefox */
      html, body { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, [isDesktop]);

  // On mobile: show default scrollbar (render nothing)
  if (!isDesktop) return null;

  return (
    <div
      className={`fixed right-[2px] w-3 h-full bg-gray-400/15 z-[100] pointer-events-none transition-opacity duration-400 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full h-16 bg-custom-red transition-all duration-150 ease-out shadow-sm rounded-full ${
          isVisible ? "translate-y-0 duration-300" : "-translate-y-30 duration-300"
        }`}
        style={{ transform: `translateY(${scrollProgress}px)` }}
      />
    </div>
  );
}
