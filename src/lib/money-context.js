'use client';
import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

const STORAGE_KEY = 'moneyState_v1';
const MoneyContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return action.payload;
    case 'AWARD': {
      const { id, amount } = action;
      if (state.awarded[id]) return state;
      return { balance: state.balance + amount, awarded: { ...state.awarded, [id]: true } };
    }
    case 'SPEND':
      return state.balance < action.amount ? state : { ...state, balance: state.balance - action.amount };
    case 'RESET':
      return { balance: 0, awarded: {} };
    default:
      return state;
  }
}

export function MoneyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { balance: 0, awarded: {} });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.balance === 'number' && parsed.awarded) {
          dispatch({ type: 'LOAD', payload: parsed });
        }
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, ready]);

  const api = useMemo(() => ({
    ...state,
    awardOnce: (id, amount) => {
      if (state.awarded[id]) return false;
      dispatch({ type: 'AWARD', id, amount });
      return true;
    },
    spend: (amount) => {
      if (state.balance < amount) return false;
      dispatch({ type: 'SPEND', amount });
      return true;
    },
    hasAward: (id) => !!state.awarded[id],
    reset: () => dispatch({ type: 'RESET' }),
    ready
  }), [state, ready]);

  return <MoneyContext.Provider value={api}>{children}</MoneyContext.Provider>;
}

export function useMoney() {
  const ctx = useContext(MoneyContext);
  if (!ctx) throw new Error('useMoney must be used inside MoneyProvider');
  return ctx;
}