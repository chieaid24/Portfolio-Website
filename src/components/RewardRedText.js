'use client';
import { useState } from 'react';
import { useMoney } from '@/lib/money-context';

export default function RedText({
  rewardId,
  kind = 'redtext',
  children,
  weight = 'bold',   // 'bold' | 'semibold'
  className = '',
}) {
  const { awardOnce, hasAward } = useMoney();
  const claimed = hasAward(rewardId);
  const [popping, setPopping] = useState(false);

  const weightOverride = weight === 'semibold' ? '!font-semibold' : '';

  const handleClick = () => {
    if (claimed) return;
    const paid = awardOnce(rewardId, kind);
    if (paid) {
      // retrigger animation even if clicked rapidly
      setPopping(false);
      requestAnimationFrame(() => setPopping(true));
      setTimeout(() => setPopping(false), 200); // match keyframe duration
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={
          `${claimed ? 'cursor-default opacity-60 dark:opacity-100' : 'cursor-pointer'} ` +
          `custom-bold ${weightOverride} inline-block ` + // inline-block helps scale nicely
          `${popping ? 'pop' : ''} ${className}`
        }
        disabled={claimed}
        aria-pressed={claimed}
        data-reward-click
      >
        {children}
      </button>

      <style jsx>{`
        .pop {
          animation: redtext-pop 200ms ease-out;
          will-change: transform;
        }
        @keyframes redtext-pop {
          0%   { transform: scale(1); }
          50%  { transform: scale(0.96); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}