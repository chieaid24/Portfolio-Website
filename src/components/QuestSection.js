import { useMoney } from '@/lib/money-context';
import { motion, useReducedMotion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";

function ProgressBar({
  done = 0,
  total = 0,
  color = 'bg-custom-red',
  isHovered = false,
}) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const isComplete = pct >= 100;
  const fillClass = isComplete ? 'gradient-red-orange' : color;

  const controls = useAnimationControls();
  const prefersReduced = useReducedMotion();

  // Fixed shimmer width in pixels
  const SHINE_PX = 60;

  useEffect(() => {
    if (prefersReduced) return;
    if (isHovered) {
      controls.set({ opacity: 1, ['--p']: 0 });
      controls.start({
        ['--p']: 1,
        opacity: [0, 1, 0],
        transition: { duration: 1.1, ease: 'linear', repeat: Infinity },
      });
    } else {
      controls.start({
        ['--p']: 1,
        opacity: 0,
        transition: { duration: 0.35, ease: 'easeOut' },
      }).then(() => {
        controls.set({ ['--p']: 0, opacity: 0 });
      });
    }
  }, [isHovered, controls, prefersReduced]);

  return (
    <motion.div className="w-full lg:w-4/5 5xl:w-6/7 py-1">
      {/* Hover target */}
      <div
        className="mt-1 h-[8px] 5xl:h-[9px] w-full rounded-full bg-progress-background overflow-hidden min-w-0"

      >
        {/* Fill */}
        <div
          className={`relative h-full ${fillClass} rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Shimmer overlay (fixed visual width, container-relative travel) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            // --p animates from 0 -> 1; left uses container width (100%) + fixed SHINE_PX overshoot
            style={{
              ['--p']: 0,
              left: `calc(var(--p) * (100%) - ${SHINE_PX}px)`,
              width: `${SHINE_PX}px`,
            }}
            className="
              pointer-events-none absolute inset-y-[-2px]
              rounded-full
              bg-gradient-to-r from-transparent via-white/80 to-transparent
            "
          />
        </div>
      </div>
    </motion.div>
  );
}



export default function QuestSection({ className = "" }) {
  const { getQuestStats } = useMoney();
  const stats = getQuestStats();
  const [hoveredRow, setHoveredRow] = useState(null);


  return (
    <div className={`pt-2 pb-2 5xl:pt-[12px] 5xl:pb-1 leading-none space-y-2 text-[10px] 5xl:text-[12px]  text-light-grey-text md:text-header-light font-medium tracking-wide ${className} cursor-default
                        lg:ml-2 `}>
      <div
        onMouseEnter={() => setHoveredRow('red')}
        onMouseLeave={() => setHoveredRow(null)}
        className="5xl:pt-0.5 5xl:pb-2 5xl:mb-0"
      >
        <p
          className={`mb-[-4px] transition-colors duration-200`}

        >red words found: <span className="font-bold">{stats.redtext.done}/{stats.redtext.total}</span></p>
        <ProgressBar done={stats.redtext.done} total={stats.redtext.total} isHovered={hoveredRow === 'red'} />
      </div>

      <div
        onMouseEnter={() => setHoveredRow('projects')}
        onMouseLeave={() => setHoveredRow(null)}
        className="5xl:pt-0.5 5xl:pb-2 5xl:mb-0"
      >
        <p className="mb-[-4px]">projects discovered: <span className="font-bold">{stats.project.done}/{stats.project.total}</span></p>
        <ProgressBar done={stats.project.done} total={stats.project.total} isHovered={hoveredRow === 'projects'} />
      </div>

      <div
        onMouseEnter={() => setHoveredRow('links')}
        onMouseLeave={() => setHoveredRow(null)}
        className="5xl:pt-0.5 5xl:pb-2 5xl:mb-0"
      >
        <p className="mb-[-4px]">links followed: <span className="font-bold">{stats.link.done}/{stats.link.total}</span></p>
        <ProgressBar done={stats.link.done} total={stats.link.total} isHovered={hoveredRow === 'links'} />
      </div>
    </div >
  );
}

