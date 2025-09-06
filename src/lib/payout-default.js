// src/lib/payoutDefault.js
import { createPayoutGenerator } from "./payout.js";

export const defaultMixtureConfig = {
  cost: 5,
  targetEV: 5.40,     // still fine to keep; EV may drift if you hard-set tailWeight
  min: 0.30,
  cap: 100,

  baseMode: 4.5,
  baseMax: 9,

  tailStart: 10,      // define what counts as “jackpot”
  tailK: 0.6,         // fatter tail

  tailWeight: 0.10,   // 🎯 ~10% of draws come from the tail

  roundToCents: true,
};

export const defaultGenerator = createPayoutGenerator(defaultMixtureConfig);
