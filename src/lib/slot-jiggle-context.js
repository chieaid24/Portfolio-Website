'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const SlotJiggleContext = createContext(null);

export function SlotJiggleProvider({ children, storageKey = 'heroSlotHasBeenClicked' }) {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [ready, setReady] = useState(false); // becomes true after we read localStorage

  // Load persisted value once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setHasBeenClicked(raw === '1');
    } catch {
      // ignore storage errors (Safari private mode, etc.)
    }
    setReady(true);
  }, [storageKey]);

  // Reflect changes from other tabs/windows
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== storageKey) return;
      setHasBeenClicked(e.newValue === '1');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [storageKey]);

  const markClicked = useCallback(() => {
    setHasBeenClicked(true);
    try { localStorage.setItem(storageKey, '1'); } catch {}
  }, [storageKey]);

  const reset = useCallback(() => {
    setHasBeenClicked(false);
    try { localStorage.removeItem(storageKey); } catch {}
  }, [storageKey]);

  return (
    <SlotJiggleContext.Provider value={{ hasBeenClicked, markClicked, reset, ready }}>
      {children}
    </SlotJiggleContext.Provider>
  );
}

export function useSlotJiggle() {
  const ctx = useContext(SlotJiggleContext);
  if (!ctx) throw new Error('useSlotJiggle must be used within <SlotJiggleProvider>');
  return ctx;
}
