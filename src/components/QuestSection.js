import { useMoney } from '@/lib/money-context';
import { motion, useReducedMotion, useAnimationControls } from "framer-motion";
import { useState } from "react";

function ProgressBar({
  done = 0,
  total = 0,
  color = 'bg-custom-red',
}) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const isComplete = pct >= 100;
  const fillClass = isComplete ? 'gradient-red-orange' : color;

  const controls = useAnimationControls();
  const prefersReduced = useReducedMotion();

  // Fixed shimmer width in pixels
  const SHINE_PX = 60;

  const handleHoverStart = () => {
    if (prefersReduced) return;
    // Start from 0 (just off the left) and loop across to 1 (right edge + SHINE_PX)
    controls.set({ opacity: 1, ['--p']: 0 });
    controls.start({
      ['--p']: 1,
      opacity: [0, 1, 0],
      transition: { duration: 1.1, ease: 'linear', repeat: Infinity },
    });
  };

  const handleHoverEnd = () => {
    if (prefersReduced) return;
    // Finish the pass to the end (p=1) and fade out, then reset back to start (p=0)
    controls.start({
      ['--p']: 1,
      opacity: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    }).then(() => {
      controls.set({ ['--p']: 0, opacity: 0 });
    });
  };

  return (
    <div className="w-full lg:w-4/5">
      {/* Hover target */}
      <motion.div
        className="mt-1 h-[8px] w-full rounded-full bg-progress-background overflow-hidden min-w-0 cursor-pointer"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
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
      </motion.div>
    </div>
  );
}



export default function QuestSection({ className = "" }) {
    const { getQuestStats } = useMoney();
    const stats = getQuestStats();

    // stats.redtext.total, stats.redtext.done, etc.

    return (
        <div className={`pt-2 pb-2 leading-none space-y-3 text-[10px] md:text-header-light text-light-grey-text font-medium tracking-wide ${className} cursor-default
                        lg:ml-2 `}>
            <div>
                <p>red words found: <span className="font-bold">{stats.redtext.done}/{stats.redtext.total}</span></p>
                <ProgressBar done={stats.redtext.done} total={stats.redtext.total} />
            </div>

            <div>
                <p>projects discovered: <span className="font-bold">{stats.project.done}/{stats.project.total}</span></p>
                <ProgressBar done={stats.project.done} total={stats.project.total} />
            </div>

            <div>
                <p>links followed: <span className="font-bold">{stats.link.done}/{stats.link.total}</span></p>
                <ProgressBar done={stats.link.done} total={stats.link.total} />
            </div>
        </div>
    );
}




// function ProgressBar({
//   done = 0,
//   total = 0,
//   color = 'bg-custom-red',
// }) {
//   const pct = total ? Math.round((done / total) * 100) : 0;
//   const isComplete = pct >= 100;
//   const fillClass = isComplete ? 'gradient-red-orange' : color;

//   const controls = useAnimationControls();
//   const prefersReduced = useReducedMotion();

//   const handleHoverStart = () => {
//     if (prefersReduced) return;
//     // Reset to offscreen-left and start infinite sweep
//     controls.set({ x: '-40%', opacity: 1 });
//     controls.start({
//       x: ['-40%', '140%'],
//       opacity: [0, 1, 0],
//       transition: { duration: 1.1, ease: 'linear', repeat: Infinity }
//     });
//   };

//   const handleHoverEnd = () => {
//     if (prefersReduced) return;
//     // Finish the current pass: slide to end & fade out, then reset to start
//     controls.start({
//       x: '140%',
//       opacity: 0,
//       transition: { duration: 0.35, ease: 'easeOut' }
//     }).then(() => {
//       controls.set({ x: '-40%', opacity: 0 });
//     });
//   };

//   return (
//     <div className="w-full lg:w-4/5">
//       {/* Hover target */}
//       <motion.div
//         className="mt-1 h-[8px] w-full rounded-full bg-progress-background overflow-hidden min-w-0 cursor-pointer"
//         onHoverStart={handleHoverStart}
//         onHoverEnd={handleHoverEnd}
//       >
//         {/* Fill */}
//         <div
//           className={`relative h-full ${fillClass} rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none`}
//           style={{ width: `${pct}%` }}
//           role="progressbar"
//           aria-valuenow={pct}
//           aria-valuemin={0}
//           aria-valuemax={100}
//         >
//           {/* Shimmer overlay */}
//           <motion.div
//             initial={{ x: '-40%', opacity: 0 }}
//             animate={controls}
//             className="
//               pointer-events-none absolute inset-y-[-2px] -left-1/3 w-2/3
//               rounded-full
//               bg-gradient-to-r from-transparent via-white/80 to-transparent
//               will-change-transform
//             "
//           />
//         </div>
//       </motion.div>
//     </div>
//   );
// }