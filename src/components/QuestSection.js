// src/components/QuestSection.jsx
'use client';
import { useMoney } from '@/lib/money-context';

export default function QuestSection() {
  const { quests } = useMoney();
  const r = quests.redtext || { total: 0, done: 0 };
  const p = quests.project || { total: 0, done: 0 };
  const l = quests.link    || { total: 0, done: 0 };

  return (
    <div className="flex items-center gap-3 text-xs font-semibold text-dark-grey-text">
      <span>red: {r.done}/{r.total}</span>
      <span>projects: {p.done}/{p.total}</span>
      <span>links: {l.done}/{l.total}</span>
    </div>
  );
}
