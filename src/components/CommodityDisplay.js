import Image from 'next/image'
import CountUp from '@/components/CountUp'
import { motion, useAnimation, useReducedMotion } from 'framer-motion'

export default function CommodityDisplay({ commodity, balanceInDollars }) {
  if (!commodity) return null;

  const { id, what, name, price, note } = commodity;
  const title = name ?? what ?? id ?? 'Commodity';
  const priceNum = Number(price) || 0;
  const canBuy = priceNum > 0 ? balanceInDollars / priceNum : 0;

  const fmtUpTo3SF = new Intl.NumberFormat(undefined, { maximumSignificantDigits: 3 });

  const { value: prettyQty, suffix } = (() => {
    const n = Number(canBuy) || 0;
    const abs = Math.abs(n);
    const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });

    if (abs >= 1e15) return { value: fmtUpTo3SF.format(fmt.format(n / 1e15)), suffix: 'q' };
    if (abs >= 1e12) return { value: fmtUpTo3SF.format(fmt.format(n / 1e12)), suffix: 't' };
    if (abs >= 1e9) return { value: fmtUpTo3SF.format(fmt.format(n / 1e9)), suffix: 'b' };
    if (abs >= 1e6) return { value: fmtUpTo3SF.format(fmt.format(n / 1e6)), suffix: 'm' };
    if (abs >= 1e3) return { value: fmtUpTo3SF.format(fmt.format(n / 1e3)), suffix: 'k' };
    return { value: fmtUpTo3SF.format(fmt.format(n)), suffix: '' };
  })();

  // Framer Motion controls (better start/stop behavior than whileHover for loops)
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();

  const startBob = () => {
    if (reduceMotion) return;
    controls.start({
      y: [0, -3, 0, -3, 0],                      // keyframes for a gentle bob
      transition: { duration: 2, ease: 'easeInOut', repeat: Infinity }
    });
  };

  const stopBob = () => {
    controls.start({ y: 0, transition: { type: 'spring', stiffness: 200, damping: 30 } });
  };

  return (
    <motion.div
      onHoverStart={startBob}
      onHoverEnd={stopBob}
      animate={controls}
      className="flex flex-col items-center font-semibold will-change-transform cursor-default"
    >
      <div className="text-5xl text-custom-red inline-block md:text-6xl">
        <CountUp to={prettyQty} from={0} direction="up" />
        {suffix && (
          <span className="text-4xl md:text-5xl">{suffix}</span>
        )}
      </div>

      <p className="text-header-light font-medium items-center text-xs text-center leading-tight md:text-sm">
        {title}
      </p>
    </motion.div>
  );
}
