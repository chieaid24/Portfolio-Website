// src/lib/tickets.js
const TICKETS_KEY = 'projectTickets_v1';

const safeParse = (s) => { try { return JSON.parse(s) || {}; } catch { return {}; } };
const save = (obj) => { try { localStorage.setItem(TICKETS_KEY, JSON.stringify(obj)); } catch {} };
const load = () => safeParse(localStorage.getItem(TICKETS_KEY));

/** ---- generators ---- **/
export const generateTicketNumber = () => {
  const n = Math.floor(Math.random() * 99) + 1; // 1..99
  return n < 10 ? `0${n}` : String(n);
};

export const generateTicketValue = () => {
  const min = 59000;
  const max = 81000;
  const steps = Math.floor((max - min) / 10);
  const value = min + Math.floor(Math.random() * (steps + 1)) * 10;
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

/** ---- validators (gentle) ---- **/
const isTicketNo = (s) => typeof s === 'string' && /^\d{2}$/.test(s);
const isTicketValue = (s) => typeof s === 'string' && /^\d{1,3}(,\d{3})*\.\d{2}$/.test(s);

/** ---- unique number helper ---- **/
const ALL_TICKET_NUMS = Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, '0'));

function generateUniqueTicketNumber(usedSet) {
  const available = ALL_TICKET_NUMS.filter(n => !usedSet.has(n));
  if (available.length === 0) return null; // exhausted
  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}

/**
 * Get or create a per-user ticket for a project slug.
 * Stored shape per slug: { number: "07", value: "15,340.00" }
 *
 * @param {string} slug
 * @param {{number?: string, value?: string}} [fallback] optional seed
 * @returns {{number: string, value: string}}
 */
export function getOrCreateTicket(slug, fallback) {
  if (typeof window === 'undefined') {
    return {
      number: isTicketNo(fallback?.number) ? fallback.number : '',
      value: isTicketValue(fallback?.value) ? fallback.value : '',
    };
  }

  const map = load();

  // If already assigned and valid, return it.
  if (map[slug] && isTicketNo(map[slug].number) && isTicketValue(map[slug].value)) {
    return map[slug];
  }

  // Build a set of numbers already in use (excluding this slug).
  const used = new Set(
    Object.entries(map)
      .filter(([k]) => k !== slug)
      .map(([, v]) => v?.number)
      .filter(isTicketNo)
  );

  // Prefer a valid, unused fallback number if provided.
  let number = (isTicketNo(fallback?.number) && !used.has(fallback.number))
    ? fallback.number
    : generateUniqueTicketNumber(used) || generateTicketNumber(); // fallback if exhausted

  const value = isTicketValue(fallback?.value) ? fallback.value : generateTicketValue();

  const ticket = { number, value };
  map[slug] = ticket;
  save(map);
  return ticket;
}

/** Optional helpers */
export function resetTickets() {
  try { localStorage.removeItem(TICKETS_KEY); } catch {}
}

export function resetTicketForSlug(slug) {
  try {
    const map = load();
    delete map[slug];
    save(map);
  } catch {}
}