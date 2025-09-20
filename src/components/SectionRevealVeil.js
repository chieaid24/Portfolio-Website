// components/SectionRevealVeil.jsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function SectionRevealVeil({
  children,
  storageKey = 'sr:veil-dismissed',         // sessionStorage key
  toColorVar = 'var(--color-background-dark)', // fade-to color (matches your section bg)
  startAt = '50%',                           // where the gradient starts (percentage of height)
  fadeMs = 300,                              // fade-out duration
  className = '',
}) {
  const wrapRef = useRef(null);
  const affectedRef = useRef([]);           // siblings below we dim/restore
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;              // SSR-safe
    return sessionStorage.getItem(storageKey) !== '1';            // show if not dismissed this session
  });
  const [hiding, setHiding] = useState(false);                    // animate overlay opacity to 0

  // Dim everything below this wrapper (next siblings) on mount, restore on dismiss
  useEffect(() => {
    if (!visible) return;

    const node = wrapRef.current;
    if (!node || !node.parentElement) return;

    // collect all following siblings
    const sibs = [];
    let el = node.nextElementSibling;
    while (el) {
      sibs.push(el);
      el = el.nextElementSibling;
    }
    affectedRef.current = sibs;

    // apply initial hidden styles
    sibs.forEach((s) => {
      s.style.transition = `opacity ${fadeMs}ms ease`;
      s.style.opacity = '0';
      s.style.pointerEvents = 'none';
    });

    // dismiss logic
    const dismiss = () => {
      setHiding(true);
      try { sessionStorage.setItem(storageKey, '1'); } catch {}
      window.removeEventListener('scroll', onScroll, { passive: true });

      // fade in below content
      sibs.forEach((s) => {
        s.style.opacity = '1';
        s.style.pointerEvents = '';
      });

      // unmount overlay after fade
      setTimeout(() => setVisible(false), fadeMs);
    };

    const onScroll = () => {
      if (window.scrollY > 0) dismiss();
    };

    // if already scrolled (bfcache / anchor), dismiss immediately
    if (window.scrollY > 0) dismiss();
    else window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [visible, fadeMs, storageKey]);

  // Clean up inline styles if this component ever unmounts early
  useEffect(() => {
    return () => {
      affectedRef.current.forEach((s) => {
        s.style.transition = '';
        s.style.opacity = '';
        s.style.pointerEvents = '';
      });
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {/* The wrapped component */}
      <div className="relative">
        {/* mask/overlay: bottom half fade (50% -> 100%), then removed after first scroll */}
        {visible && (
          <div
            aria-hidden
            className={[
              'pointer-events-none absolute left-0 right-0 bottom-0 z-10',
              'transition-opacity',
              hiding ? 'opacity-0' : 'opacity-100',
            ].join(' ')}
            style={{
              top: startAt, // e.g. "50%"
              height: `calc(100% - ${startAt})`,
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${toColorVar} 100%)`,
              transitionDuration: `${fadeMs}ms`,
            }}
          />
        )}

        {children}
      </div>
    </div>
  );
}
