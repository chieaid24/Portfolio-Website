// components/ScrollRevealWrapper.jsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollRevealWrapper({
  children,
  storageKey = 'srw:dismissed',           // unique per use
  toColorVar = 'var(--color-background-dark)', // overlay "cover" color
  revealMs = 2000,                         // reveal duration
  className = '',
}) {
  const wrapRef = useRef(null);
  const belowRef = useRef([]);
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(storageKey) !== '1';
  });
  const [started, setStarted] = useState(false); // begin reveal (children -> opacity:1)
  const [overlayDone, setOverlayDone] = useState(false); // slide overlay out

  // collect and dim everything below this wrapper
  useEffect(() => {
    if (!active) return;
    const node = wrapRef.current;
    if (!node || !node.parentElement) return;

    const sibs = [];
    let el = node.nextElementSibling;
    while (el) {
      sibs.push(el);
      el = el.nextElementSibling;
    }
    belowRef.current = sibs;

    sibs.forEach((s) => {
      s.style.transition = `opacity ${revealMs}ms ease`;
      s.style.opacity = '0';
      s.style.pointerEvents = 'none';
    });

    const dismiss = () => {
      setStarted(true);          // children fade to 1
      setOverlayDone(true);      // overlay slides down
      sibs.forEach((s) => {
        s.style.opacity = '1';
        s.style.pointerEvents = '';
      });
      // remove after animation
      window.setTimeout(() => {
        try { sessionStorage.setItem(storageKey, '1'); } catch {}
        setActive(false);
      }, revealMs);
      window.removeEventListener('scroll', onScroll);
    };

    const onScroll = () => {
      if (window.scrollY > 0) dismiss();
    };

    // already scrolled (history restore/back-forward cache)
    if (window.scrollY > 0) dismiss();
    else window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      // cleanup styles if unmounted early
      sibs.forEach((s) => {
        s.style.transition = '';
        s.style.opacity = '';
        s.style.pointerEvents = '';
      });
    };
  }, [active, revealMs, storageKey]);

  // If already dismissed this session, just render children normally
  if (!active) {
    return <div ref={wrapRef} className={className}>{children}</div>;
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {/* Content starts invisible; fades to 1 on first scroll */}
      <div
        className={`transition-opacity duration-300 ${started ? 'opacity-100' : 'opacity-0'}`}
      >
        {children}
      </div>

      {/* Sliding transparency gradient overlay (top -> down) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 transition-transform"
        style={{
          // Start fully covering (at top); on scroll, slide past bottom
          transform: overlayDone ? 'translateY(100%)' : 'translateY(0%)',
          transitionDuration: `${revealMs}ms`,
          // Transparent at top edge, opaque below to "hide" content until it passes
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${toColorVar} 35%, ${toColorVar} 100%)`,
        }}
      />
    </div>
  );
}
