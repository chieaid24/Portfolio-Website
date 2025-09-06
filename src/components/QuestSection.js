import { useMoney } from '@/lib/money-context';

export default function QuestSection() {
  const { getQuestStats } = useMoney();
  const stats = getQuestStats();
  // stats.redtext.total, stats.redtext.done, etc.
  return (
    <div>
      <p>Red Texts: {stats.redtext.done} / {stats.redtext.total}</p>
      <p>Projects:  {stats.project.done} / {stats.project.total}</p>
      <p>Links:     {stats.link.done} / {stats.link.total}</p>
    </div>
  );
}