// src/lib/payout.js

// -------- RNG plumbing -------------------------------------------------------
// Use crypto RNG if available (browser/Node). Fallback to Math.random.
// You can also pass your own RNG via config for tests/replay.
export function makeCryptoRNG() {
  const hasCrypto =
    typeof globalThis !== "undefined" &&
    globalThis.crypto &&
    typeof globalThis.crypto.getRandomValues === "function";

  if (hasCrypto) {
    return {
      random: () => {
        const buf = new Uint32Array(1);
        globalThis.crypto.getRandomValues(buf);
        return (buf[0] >>> 0) / 2 ** 32; // [0,1)
      },
    };
  }
  return { random: Math.random };
}

// Simple seeded RNG for testing/replay.
export function makeMulberry32(seed) {
  let t = seed >>> 0;
  return {
    random: () => {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 2 ** 32;
    },
  };
}

// -------- Distributions ------------------------------------------------------
// Triangular(a, m, b): bounded, mode at m, O(1) inverse-CDF sampling.
export function triangularSample(rng, a, m, b) {
  if (!(a <= m && m <= b)) throw new Error("Require a <= m <= b");
  const u = rng.random();
  const Fm = (m - a) / (b - a);
  if (u < Fm) {
    return a + Math.sqrt(u * (b - a) * (m - a));
  } else {
    return b - Math.sqrt((1 - u) * (b - a) * (b - m));
  }
}

// Mean of the triangular distribution: handy for calibration.
export function triangularEV(a, m, b) {
  return (a + m + b) / 3;
}

// Power-tail on [m, cap]: x = m + (cap - m) * u^k, k>0.
// k < 1 → fatter right tail (bigger jackpots), k > 1 → thinner tail.
export function powerTailSample(rng, m, cap, k) {
  if (!(cap > m)) throw new Error("Require cap > m");
  if (!(k > 0)) throw new Error("Require k > 0");
  const u = rng.random();
  return m + (cap - m) * Math.pow(u, k);
}

// Mean of power-tail (closed-form): EV = m + (cap - m)/(k + 1)
export function powerTailEV(m, cap, k) {
  return m + (cap - m) / (k + 1);
}

// -------- Mixture builder ----------------------------------------------------
function clamp(x, lo, hi) {
  return Math.min(Math.max(x, lo), hi);
}
function toCents(x) {
  return Math.round(x * 100) / 100;
}

// Solve for mixture weight p so: EV = (1-p)*evBase + p*evTail = targetEV
function calibrateP(evTarget, evBase, evTail) {
  const denom = evTail - evBase;
  if (denom <= 0) {
    // Tail not larger than base — default to pure base to keep shape sane.
    return 0;
  }
  return clamp((evTarget - evBase) / denom, 0, 1);
}

// Factory: returns { next(), info() }
export function createPayoutGenerator(cfg) {
  const rng = cfg.rng || makeCryptoRNG();

  // Basic sanity checks for consistent bounds.
  if (!(cfg.min < cfg.baseMode && cfg.baseMode <= cfg.baseMax && cfg.baseMax <= cfg.cap)) {
    throw new Error("Require min < baseMode <= baseMax <= cap");
  }
  if (!(cfg.tailStart >= cfg.baseMax && cfg.tailStart < cfg.cap)) {
    throw new Error("Require tailStart >= baseMax and tailStart < cap");
  }

  // Closed-form component means → exact EV control.
  const evBase = triangularEV(cfg.min, cfg.baseMode, cfg.baseMax);
  const evTail = powerTailEV(cfg.tailStart, cfg.cap, cfg.tailK);

  // Compute tail probability p to hit targetEV.
  const p = calibrateP(cfg.targetEV, evBase, evTail);
  const evOverall = (1 - p) * evBase + p * evTail;

  const drawBase = () => {
    const x = triangularSample(rng, cfg.min, cfg.baseMode, cfg.baseMax);
    return cfg.roundToCents ? toCents(x) : x;
  };

  const drawTail = () => {
    const x = powerTailSample(rng, cfg.tailStart, cfg.cap, cfg.tailK);
    return cfg.roundToCents ? toCents(x) : x;
  };

  return {
    // Single payout draw from the mixture (O(1), bounded).
    next: () => {
      const u = rng.random();
      const raw = u < p ? drawTail() : drawBase();
      return clamp(raw, cfg.min, cfg.cap);
    },

    // Useful telemetry for UI/debugging/tuning.
    info: () => ({
      p,
      evBase,
      evTail,
      evOverall,
      config: cfg,
    }),
  };
}
