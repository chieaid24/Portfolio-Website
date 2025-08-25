"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

//joins all CSS classes together into one string
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

//sets the default props for everything
const RotatingHeroText = forwardRef((props, ref) => {
  const {
    texts,
    texts2,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  //tracks the current word that is being shown, ie in ["Hello, Bye"] -> currentTextIndex[0] = Hello
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  //splits each word into characters
  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  //different ways to split the words, by characters, words, lines, etc
  //now processes both texts and texts2 at the same index
  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    const currentText2 = texts2 ? texts2[currentTextIndex] : "";
    
    const processText = (text) => {
      if (splitBy === "characters") {
        const words = text.split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }

      return text.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1,
      }));
    };

    return {
      primary: processText(currentText),
      secondary: texts2 ? processText(currentText2) : null
    };
  }, [texts, texts2, currentTextIndex, splitBy]);

  //gets the stagger delay of each letter, creates the wave effect of each letter being animated
  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  // these functions move to the next text in the array, creates the loop as well, ADD SHUFFLE LOGIC
  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    if (texts.length <= 1) {
      // If only one text, nothing to change to
      return;
    }
    
    // Generate random index different from current index
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * texts.length);
    } while (nextIndex === currentTextIndex);
    
    handleIndexChange(nextIndex);
  }, [currentTextIndex, texts.length, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  //lets parent components control the animation
  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
    }),
    [next, previous, jumpTo, reset]
  );
  
  // Helper function to render text elements with stagger animation
  const renderTextElements = useCallback((textElements, isSecondary = false) => {
    return textElements.map((wordObj, wordIndex, array) => {
      const previousCharsCount = array
        .slice(0, wordIndex)
        .reduce((sum, word) => sum + word.characters.length, 0);
      
      return (
        <span key={`${isSecondary ? 'secondary' : 'primary'}-${wordIndex}`} className={cn("inline-flex", splitLevelClassName)}>
          {wordObj.characters.map((char, charIndex) => (
            <motion.span
              key={`${isSecondary ? 'secondary' : 'primary'}-${charIndex}`}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={{
                ...transition,
                delay: getStaggerDelay(
                  previousCharsCount + charIndex,
                  array.reduce((sum, word) => sum + word.characters.length, 0)
                ),
              }}
              className={cn("inline-block", elementLevelClassName)}
            >
              {char}
            </motion.span>
          ))}
          {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
        </span>
      );
    });
  }, [initial, animate, exit, transition, getStaggerDelay, splitLevelClassName, elementLevelClassName]);

  return (
    <motion.span
      className={cn(
        "flex flex-col whitespace-pre-wrap relative", // Changed to flex-col for vertical stacking
        mainClassName
      )}
      {...rest}
      layout
      transition={transition}
    >
      {/* Screen reader text for both primary and secondary text */}
      <span className="sr-only">
        {texts[currentTextIndex]}
        {texts2 && ` ${texts2[currentTextIndex]}`}
      </span>
      
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className="flex flex-col w-full" // Vertical layout for primary and secondary
          layout
          aria-hidden="true"
        >
          {/* Primary text (texts) */}
          <span className={cn(
            splitBy === "lines"
              ? "flex flex-col w-full"
              : "flex flex-wrap whitespace-pre-wrap relative"
          )}>
            {renderTextElements(elements.primary)}
          </span>
          
          {/* Secondary text (texts2) - only render if texts2 exists */}
          {elements.secondary && (
            <span className={cn(
              splitBy === "lines"
                ? "flex flex-col w-full"
                : "flex flex-wrap whitespace-pre-wrap relative"
            )}>
              {renderTextElements(elements.secondary, true)}
            </span>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingHeroText.displayName = "RotatingHeroText";
export default RotatingHeroText;