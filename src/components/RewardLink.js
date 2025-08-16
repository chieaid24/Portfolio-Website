'use client';
import Link from 'next/link';
import { useMoney } from '@/lib/money-context';

export default function RewardLink({ rewardId, kind, onClick, children, ...rest }) {
  const { awardOnce, hasAward } = useMoney();
  const claimed = hasAward(rewardId);

  return (
    <Link
      {...rest}
      onClick={(e) => {
        awardOnce(rewardId, kind);
        onClick?.(e);
      }}
      data-reward-id={rewardId}
      className={claimed ? 'opacity-80' : ''}
    >
      {children}
    </Link>
  );
}