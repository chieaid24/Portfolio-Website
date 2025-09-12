'use client'
// components/WidgetCarousel.jsx
import { useState } from "react";
import CarouselArrow from "@/icons/CarouselArrow";
import CarouselDot from "@/icons/CarouselDot"

function ArrowButton({ dir = "left", disabled, onClick }) {
    const [pressed, setPressed] = useState(false);

    const handleClick = () => {
        if (disabled) return;
        setPressed(true);
        onClick?.();
        setTimeout(() => setPressed(false), 150); // animate back
    };

    const iconBase =
        "w-4 h-4 transition-transform duration-200 ease-in " +
        (dir === "left" ? "rotate-180 " : "");
    const translate =
        pressed ? (dir === "left" ? "-translate-x-0.5" : "translate-x-0.5") : "";

    return (
        <button
            type="button"
            onClick={handleClick}
            className="text-neutral-200 px-1 py-1 text-sm cursor-pointer disabled:cursor-default disabled:text-neutral-500 disabled:pointer-events-none transition-colors duration-200"
            aria-label={dir === "left" ? "Previous widget" : "Next widget"}
            disabled={disabled}
        >
            <CarouselArrow className={`${iconBase}${translate ? " " + translate : ""}`} />
        </button>
    );
}

export default function WidgetCarousel({
    items = [],         // [{ id, title, element }]
    className = "",
    initialIndex = 0,
}) {
    const [index, setIndex] = useState(
        Math.min(initialIndex, Math.max(0, items.length - 1))
    );

    const clamp = (n, min, max) => Math.max(min, Math.min(n, max));
    const goTo = (i) => setIndex((prev) => clamp(i, 0, items.length - 1));

    const atStart = index === 0;
    const atEnd = index === items.length - 1;

    return (
        <section className={`relative ${className}`} aria-roledescription="carousel" aria-label="Widget carousel">
            {/* Header (always visible) */}
            <header className="bg-dark-grey-text sticky top-0 translate-y-[10px] z-10 flex items-center justify-center gap-2.5 p-1 overflow-hidden rounded-t-xl">
                <div className="flex items-center gap-3">
                    {/* Left */}
                    <div className="flex items-center gap-8">
                        <ArrowButton dir="left" disabled={atStart} onClick={() => goTo(index - 1)} />

                        {/* Dots (indicators only; non-interactive) */}
                        <div className="flex gap-[7px] pointer-events-none select-none" aria-hidden="true">
                            {items.map((_, i) => (
                                <CarouselDot
                                    key={i}
                                    className={`w-2 h-2 transition ${index === i
                                            ? "text-neutral-200 scale-135"   // selected = light
                                            : "text-neutral-500 "   // not selected = grey
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Right */}
                        <ArrowButton dir="right" disabled={atEnd} onClick={() => goTo(index + 1)} />
                    </div>
                </div>
            </header>

            {/* Slides: transform-based, no scrolling */}
            <div className="overflow-hidden">
                <div
                    className="flex w-full transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {items.map((it, i) => (
                        <div
                            key={it.id ?? i}
                            className="shrink-0 basis-full min-w-0"
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${items.length}`}
                        >
                            <div className="h-full">{it.element}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
