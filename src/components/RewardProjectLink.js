'use client';
import Link from 'next/link';
import { useMoney } from '@/lib/money-context';

export default function RewardProjectLink({ rewardId, kind = "project", ticketValue, onClick, children, className, ...rest }) {
    const { awardOnce, hasAward } = useMoney();
    const claimed = hasAward(rewardId);

    return (
        <Link
            {...rest}
            onClick={(e) => {
                awardOnce(rewardId, kind, ticketValue);
                onClick?.(e);
            }}
            data-reward-id={rewardId}
            className={`transition-opacity duration-200 ${claimed ? 'opacity-90' : 'opacity-100'} ${className}`}
        >
            {children}
        </Link>
    );
}