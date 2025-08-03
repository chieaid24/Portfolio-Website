'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import RotatingText from './RotatingText.js';
import Image from 'next/image';

export default function HeroSlot() {
  const textRef = useRef(null);
  const leverRef = useRef(null);
  const shadowRef = useRef(null);
  const [scope, animate] = useAnimate();
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const jiggleTimeoutRef = useRef(null);

  const duration = 0.6;
  const milliDuration = duration * 1000;

  // Jiggle animation function
  const jiggleAnimation = async () => {
    if (hasBeenClicked) return; // Don't jiggle if already clicked

    const JiggleXPromise = animate(
      scope.current,
      {
        x: [0, -2, 0, -1, 0, -1, 0],
      },
      {
        duration: 0.7,
        ease: 'easeInOut',
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
      }
    );

    // const JiggleYPromise = animate(
    //   scope.current,
    //   {
    //     y: [0, 2, 0, 1, 0, 1, 0],
    //   },
    //   {
    //     duration: 0.7,
    //     ease: 'easeInOut',
    //     times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
    //   }
    // );

    const PulsePromise = animate(
      scope.current,
      {
        fill: ['#FF7D7D', '#ffb0b0', '#FF7D7D'],
      },
      {
        duration: 1,
        ease: 'easeInOut',
        times: [0, 0.2, 1],
      }
    );
    await Promise.all([JiggleXPromise, PulsePromise]);
  };

  // Start jiggle cycle
  const startJiggleCycle = () => {
    if (hasBeenClicked) return;

    const scheduleNextJiggle = () => {
      jiggleTimeoutRef.current = setTimeout(() => {
        if (!hasBeenClicked) {
          jiggleAnimation().then(() => {
            if (!hasBeenClicked) {
              scheduleNextJiggle();
            }
          });
        }
      }, 2500);
    };

    scheduleNextJiggle();
  };

  // Effect to start the jiggle cycle when component mounts
  useEffect(() => {
    startJiggleCycle();

    // Cleanup timeout on unmount
    return () => {
      if (jiggleTimeoutRef.current) {
        clearTimeout(jiggleTimeoutRef.current);
      }
    };
  }, [hasBeenClicked]);

  function animateShadow({ ref, from, to, duration = 300 }) {
    const startTime = performance.now();

    function update(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const lerp = (a, b) => a + (b - a) * progress;

      ref.setAttribute('dx', lerp(from.dx, to.dx));
      ref.setAttribute('dy', lerp(from.dy, to.dy));
      ref.setAttribute('stdDeviation', lerp(from.blur, to.blur));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const leverAnim = async () => {
    await animate(leverRef.current, {
      rotate: [30, 150, 150, 30],
    }, {
      duration: duration,
      times: [0, 0.507, 0.6, 1],
      transformOrigin: 'center',
      ease: 'easeInOut',
    });
  };

  const pullLever = async () => {
    // Mark as clicked and clear any pending jiggle timeouts
    setHasBeenClicked(true);
    if (jiggleTimeoutRef.current) {
      clearTimeout(jiggleTimeoutRef.current);
    }

    // Step 1: Smoothly increase the shadow
    if (shadowRef.current) {
      animateShadow({
        ref: shadowRef.current,
        from: { dx: 2, dy: 2, blur: 2 },
        to: { dx: -2, dy: 0, blur: 2 },
        duration: milliDuration * 0.5,
      });
    }

    // Start the animation, but don't await it yet
    const yAnimation = animate(
      scope.current,
      {
        y: [0, 225, 225, 0],
      },
      {
        duration: duration,
        ease: 'easeInOut',
        transformOrigin: 'center',
        times: [0, 0.5, 0.6, 1],
      }
    );

    const xAnimation = animate(
      scope.current,
      {
        x: [0, 20, 0, 0, 20, 0],
      },
      {
        duration: duration,
        times: [0, 0.25, 0.5, 0.6, 0.85, 1],
        ease: 'easeInOut',
      }
    );

    // Trigger textRef.next() halfway through the animation
    textRef.current?.next();

    setTimeout(() => {
      if (shadowRef.current) {
        animateShadow({
          ref: shadowRef.current,
          from: { dx: -2, dy: 0, blur: 2 },
          to: { dx: 2, dy: 2, blur: 2 },
          duration: milliDuration * 0.3,
        });
      }
    }, milliDuration * 0.7); // wait 600ms

    await leverAnim();
    // Wait for animation to finish
    await yAnimation;
  };

  return (
    <div>
      <div className="flex justify-between mb-[-80px]"> {/**top corners div */}
        <Image src="/hero/corner_tl.svg" alt="Top Left Corner" width={60} height={60} />
        <Image src="/hero/corner_tr.svg" alt="Top Right Corner" width={60} height={60} />
      </div>
      <div className="grid grid-cols-[2fr_1fr] h-80 gap-6 mt-[-50px]">
        <div className="relative overflow-visible min-w-0">
          <div className="absolute top-15 left-35">
            {/* Rotating Text */}
            <RotatingText
              ref={textRef}
              texts={['AIDAN', 'ENG', 'DES', 'INVE', 'CLIM', 'FILM', 'STU', 'GYM', 'CODE', 'CAD', 'REELS', 'GAME', 'UI/UX', 'WEB', 'AI', 'NYT', 'SLEEP',]}
              texts2={['CHIEN', 'INEER', 'IGNER', 'NTOR', 'BER', 'MAKER', 'DENT', 'GOER', 'ADDICT', 'HEAD', 'SNOB', 'NERD', 'FAN', 'DEV', 'FIEND', 'GAMER', 'LOVER',]}
              mainClassName="overflow-visible px-2 sm:px-2 md:px-3 text-9xl bg-background-light text-dark-grey-text font-italiana py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '120%' }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={2000}
              auto={false}
            />
          </div>
        </div>
        {/* SVG Lever Button */}
        <div className="flex items-center h-[400px]">
          <div className="m-5 h-full flex relative items-center"> {/**lever and block div */}
            <svg
              width="90"
              height="140"
              viewBox="0 0 90 140"
              className="p-0"> {/**block svg */}
              <rect
                x="0"
                y="0"
                width="90"
                height="150"
                fill="#878787"
              />
            </svg>
            <svg
              width="100"
              height="300"
              viewBox="0 0 100 270"
              className="absolute translate-x-[45px]"
            > {/*lever svg*/}
              <motion.rect
                ref={leverRef}
                x="0"
                y="0"
                width="20"
                height="270"
                fill="#D9D9D9"
                initial={{ rotate: 30 }}
                className="translate-x-[-10px]"
              />
            </svg>
          </div>
          <svg
            width="150"
            height="500"
            viewBox="0 0 150 100"
            className="z-10 translate-x-[-47px] translate-y-[-10px]"
          > {/**lever ball svg */}
            <defs>
              <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow ref={shadowRef} dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
              </filter>
            </defs>
            <motion.circle
              ref={scope}
              cx="50"
              cy="-55"
              r="28"
              fill="#FF7D7D"
              filter="url(#dropShadow)"
              whileTap={{ scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              onClick={pullLever}
              className="cursor-pointer"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-between mt-[-10px]"> {/**top corners div */}
        <Image src="/hero/corner_bl.svg" alt="Bottom Left Corner" width={60} height={60} />
        <Image src="/hero/corner_br.svg" alt="Bottom Right Corner" width={60} height={60} />
      </div>
    </div>
  );
}