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

/** ---------- helpers for category-based rewards ---------- **/

// Round to fixed decimals (max 2 by default)
const roundTo = (n, decimals = 2) => {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
};

// Random number in [min, max], rounded to `decimals`
const randInRange = (min, max, decimals = 2) => roundTo(Math.random() * (max - min) + min, decimals);

// Return a random amount based on the reward "kind" (PLACEHOLDER tuning)
function amountFor(kind) {
  switch (kind) {
    case 'link':
      return randInRange(3, 8, 2);

    case 'project':
      // Placeholder: SHOULD RETURN A PRE CREATED REWARD AMOUNT PASSED AS AN OPTIONS 3RD PARAMETER
      return randInRange(20, 50, 0);

    case 'redtext':
      return 0.75;

    case 'egg':
    // Placeholder: for hidden egg, should still be a range
      return randInRange(1, 5, 2);

    case 'lever':
      // Placeholder: should return a value from 0.1-3.7, create a new function that is weighted, so rarely get lots of money
      return randInRange(0, 20, 2);

    default:
      // Unknown kinds award 0 by default
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

    /**
     * Award once per `rewardId`, computing the amount from a category string.
     * @param {string} id - stable reward id (e.g., "proj:ai-dashboard")
     * @param {'redtext'|'project'|'link'|'egg'|'lever'} kind - reward category
     * @returns {boolean} true if paid (first time), false otherwise
     */
    awardOnce: (id, kind) => {
      if (state.awarded[id]) return false;

      // Validate category
      const allowed = new Set(['redtext', 'project', 'link', 'egg', 'lever']);
      if (!allowed.has(kind)) {
        if (process.env.NODE_ENV !== 'production') {
          // helpful console warning in dev
          // eslint-disable-next-line no-console
          console.warn(`awardOnce: invalid kind "${kind}" for id "${id}"`);
        }
        return false;
      }

      const amount = amountFor(kind);
      if (amount <= 0) return false; // nothing to award

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