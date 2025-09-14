// src/components/SkillDisplay.jsx
'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import RedText from "@/components/RewardRedText"

export default function SkillDisplay({ fileName, project = "", displayName = "", card = false }) {
  // Dynamically import the icon component: /src/icons/skills/{name}.js
  const Icon = useMemo(
    () =>
      dynamic(
        () =>
          import(`@/icons/skills/${fileName}.js`).catch(() =>
            import('@/icons/skills/BackupNYT.js') // optional fallback icon
          ),
        {
          ssr: false,
          loading: () => (
            <span className="inline-block h-6 w-6 animate-pulse rounded" />
          ),
        }
      ),
    [fileName]
  );
  const divClassName =
  `inline-flex items-center gap-2 bg-custom-red text-white px-1.5 rounded-lg font-bold
  ${
    card ? 'py-1 text-[14px] opacity-90 group-hover/pc:opacity-100 hover:translate-y-[-1px] duration-200' : 'translate-y-[2px] py-0.5 text-[16px]'
  }`;
  const iconClassName = `${card ? 'h-[20px] w-[20px]' : 'h-[25px] w-[25px]'}`

  return (
    <RedText rewardId={`red:${project}:${fileName.toLowerCase()}`}>
      <div className={divClassName}>
        <Icon className={iconClassName} aria-hidden="true" />
        <div className="">{displayName ? displayName : fileName}</div>
      </div>
    </RedText>
  );
}
