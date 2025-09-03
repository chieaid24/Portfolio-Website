'use client';
import React, { createContext, useContext, useEffect, useMemo, useReducer, useState, useRef } from 'react';
import { createPayoutGenerator } from "@/lib/payout.js";
import { defaultMixtureConfig } from "@/lib/payoutDefault.js";

const STORAGE_KEY = 'moneyState_v1';
const MoneyContext = createContext(null);
const MAX_BAL = 999.99;

let __payoutGen = null;

function getPayoutGen() {
  if (!__payoutGen) {
    __payoutGen = createPayoutGenerator(defaultMixtureConfig);
  }
  return __payoutGen;
}

function addWithCap(balance, amount) {
  const b = normalize2(balance);
  const a = normalize2(amount);
  if (!Number.isFinite(a) || a <= 0) return b;

  const sum = b + a;
  return sum > MAX_BAL ? MAX_BAL : normalize2(sum);
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD': {
      const s = action.payload || {};
      return {
        balance: Math.min(MAX_BAL, normalize2(toAmount(s.balance ?? 0))),
        awarded: s.awarded || {},
      };
    }
    case 'AWARD': {
      const { id, amount } = action;
      if (state.awarded[id]) return state;
      const amt = normalize2(toAmount(amount));
      if (!Number.isFinite(amt) || amt <= 0) return state;

      return {
        balance: addWithCap(state.balance, amt),   // <-- clamp here
        awarded: { ...state.awarded, [id]: true },
      };
    }
    case 'AWARDINF': {
      const amt = normalize2(toAmount(action.amount));
      if (!Number.isFinite(amt) || amt <= 0) return state;
      return { ...state, balance: addWithCap(state.balance, amt) }; // <-- clamp here
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
    case 'OVERFLOW':
      return state;
    case 'UNDERFLOW':
      return state;
    case 'INPUT': {
      const amt = normalize2(toAmount(action.amount));
      if (!Number.isFinite(amt) || amt <= 0) return state;
      return { ...state, balance: amt }
    }
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
      return randInRange(12, 32);

    case 'project': {
      const n = toAmount(projValue);
      if (Number.isFinite(n) && n > 0) return roundTo(n, 2); // force 2dp max
      return randInRange(60, 80, 0);
    }

    case 'redtext':
      return 2.5;

    case 'egg':
      return randInRange(1, 5);

    default:
      return 0;
  }
}

function leverPayout() {
  const gen = getPayoutGen();
  return normalize2(gen.next()); // bounded, cents-rounded payout
}

export function MoneyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { balance: 0, awarded: {} });
  const [ready, setReady] = useState(false);
  const [overflowTick, setOverflowTick] = useState(0);
  const [underflowTick, setUnderflowTick] = useState(0);
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; }, [state]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.balance !== 'undefined' && parsed.awarded) {
          dispatch({ type: 'LOAD', payload: parsed });
        }
      }
    } catch { }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { }
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

      const allowed = new Set(['redtext', 'project', 'link', 'egg']);
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

      if (normalize2(state.balance) === MAX_BAL) {
        setOverflowTick(t => t + 1);
      }

      dispatch({ type: 'AWARD', id, amount });
      return true;
    },

    spend: (amount) => {
      const amt = normalize2(toAmount(amount));
      if (!Number.isFinite(amt) || amt <= 0) return false;
      if (normalize2(state.balance) < amt) {
        setUnderflowTick(t => t + 1);
        return false;
      }

      dispatch({ type: 'SPEND', amount: amt });
      return true;
    },

    hasAward: (id) => !!state.awarded[id],

    reset: () => dispatch({ type: 'RESET' }),

    awardLever: (spendAmt) => {
      const gen = getPayoutGen();

      // Use provided spendAmt if valid; otherwise fall back to generator’s configured cost
      let cost = normalize2(toAmount(spendAmt));
      if (!Number.isFinite(cost) || cost <= 0) {
        cost = normalize2(gen.info().config.cost); // e.g., 5 from your default config
      }

      //if the spend will make it underflow increment underflow and return false;
      if (normalize2(state.balance) < cost) {
        dispatch({ type: 'UNDERFLOW' });
        setUnderflowTick(t => t + 1);
        console.log(underflowTick);
        return false;
      }

      dispatch({ type: 'SPEND', amount: cost });
      const payoutAmount = normalize2(leverPayout()); // compute this outside
      window.setTimeout(() => {
        if (Number.isFinite(payoutAmount) && payoutAmount > 0) {
          dispatch({ type: 'AWARDINF', amount: payoutAmount });
        }
      }, 500);

      return true;
    },

    // on an overflow, it sets the balanceFx to 'overflow', which is listened for in AnimatedBalance, and plays the custom trio
    // then on the next frame, it sets the balance Fx back to null to be potentially called again
    triggerOverflowFx: () => {
      dispatch({ type: 'OVERFLOW' });
      setOverflowTick(t => t + 1);
    },

    triggerUnderFlowFx: () => {
      dispatch({ type: 'UNDERFLOW' });
      setUnderflowTick(t => t + 1);
    },

    inputBalance: (amt) => {
      dispatch({ type: 'INPUT', amount: amt })
    },

    underflowTick,
    overflowTick,
    ready

  }), [state, ready, overflowTick, underflowTick]);

  return <MoneyContext.Provider value={api}>{children}</MoneyContext.Provider>;
}

export function useMoney() {
  const ctx = useContext(MoneyContext);
  if (!ctx) throw new Error('useMoney must be used inside MoneyProvider');
  return ctx;
}