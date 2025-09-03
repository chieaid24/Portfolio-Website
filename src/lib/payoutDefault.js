// src/lib/payoutDefault.js
import { createPayoutGenerator } from "./payout.js";

// Defaults: base centered near $5, tail from $10–$100, EV slightly > cost.
export const defaultMixtureConfig = {
  cost: 5,
  targetEV: 5.40, // long-run average payout you want

  min: 0.30,
  cap: 100,

  baseMode: 5,
  baseMax: 12,     // tighten to 8–9 for stronger clustering near $5

  tailStart: 12,
  tailK: 0.2,      // <1 fattens jackpots; >1 thins them

  roundToCents: true,
};

export const defaultGenerator = createPayoutGenerator(defaultMixtureConfig);
