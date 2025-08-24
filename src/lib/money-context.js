'use client';
import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

const STORAGE_KEY = 'moneyState_v1';
const MoneyContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD': {
      const s = action.payload || {};
      return {
        balance: normalize2(toAmount(s.balance ?? 0)),
        awarded: s.awarded || {},
      };
    }
    case 'AWARD': {
      const { id, amount } = action;
      if (state.awarded[id]) return state;
      const amt = normalize2(toAmount(amount));
      if (!Number.isFinite(amt) || amt <= 0) return state;
      return {
        balance: normalize2(state.balance + amt),
        awarded: { ...state.awarded, [id]: true },
      };
    }
    case 'SPEND': {
      const spendAmt = normalize2(toAmount(action.amount));
      if (!Number.isFinite(spendAmt) || spendAmt <= 0) return state;
      return normalize2(state.balance) < spendAmt
        ? state
        : { ...state, balance: normalize2(state.balance - spendAmt) };
    }
    case 'RESET':
      return { balance: 0, awarded: {} };
    default:
      return state;
  }
}

/** ---------- helpers ---------- **/
const roundTo = (n, decimals = 2) => {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
};

// hard cap at 2 decimals; also coerces strings
const normalize2 = (v) => {
  const n = typeof v === 'number' ? v : Number.parseFloat(v);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100) / 100;
};

const randInRange = (min, max, decimals = 2) => roundTo(Math.random() * (max - min) + min, decimals);

// Accepts numbers or strings like "15,340.00", "$15,340.00"
const toAmount = (v) => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const cleaned = v.replace(/[,$\s]/g, '');
    const n = Number.parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  return NaN;
};

// For 'project', an optional projValue can be provided.
function amountFor(kind, { projValue } = {}) {
  switch (kind) {
    case 'link':
      return randInRange(3, 8, 2);

    case 'project': {
      const n = toAmount(projValue);
      if (Number.isFinite(n) && n > 0) return roundTo(n, 2); // force 2dp max
      return randInRange(20, 50, 0);
    }

    case 'redtext':
      return 0.75;

    case 'egg':
      return randInRange(1, 5, 2);

    case 'lever':
      return randInRange(0.1, 3.7, 2);

    default:
      return 0;
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
        if (parsed && typeof parsed.balance !== 'undefined' && parsed.awarded) {
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

    /**
     * Award once per `rewardId`, computing the amount from a category string.
     * @param {string} id
     * @param {'redtext'|'project'|'link'|'egg'|'lever'} kind
     * @param {number|string} [projValue] Optional amount when kind === 'project'
     * @returns {boolean} true if paid (first time), false otherwise
     */
    awardOnce: (id, kind, projValue) => {
      if (state.awarded[id]) return false;

      const allowed = new Set(['redtext', 'project', 'link', 'egg', 'lever']);
      if (!allowed.has(kind)) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn(`awardOnce: invalid kind "${kind}" for id "${id}"`);
        }
        return false;
      }

      // Compute amount and normalize to 2 decimals to avoid FP drift
      const rawAmount = amountFor(kind, { projValue });
      const amount = normalize2(rawAmount);
      if (!(Number.isFinite(amount) && amount > 0)) return false;

      dispatch({ type: 'AWARD', id, amount });
      return true;
    },

    spend: (amount) => {
      const amt = normalize2(toAmount(amount));
      if (!Number.isFinite(amt) || amt <= 0) return false;
      if (normalize2(state.balance) < amt) return false;
      dispatch({ type: 'SPEND', amount: amt });
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