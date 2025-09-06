"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMoney } from "@/lib/money-context";

import AnimatedBalance from "@/components/AnimatedBalance";
import RewardLink from "@/components/RewardLink"
import DevMoneyReset from "@/components/DevMoneyReset"; // <- use your wrapper"
import OverflowButton from "@/components/OverflowButton";
import DevBalanceInput from "@/components/DevBalanceInput"

export default function Header() {
    const [showHeader, setShowHeader] = useState(true);
    const [walletOpen, setWalletOpen] = useState(false);
    const [holdOpen, setHoldOpen] = useState(false);


    const firstBalanceRender = useRef(true);
    const lastYRef = useRef(0);

    const { balance, ready } = useMoney();

    const infoVariants = {
        closed: { opacity: 1, y: 0 },
        open: { opacity: 0, y: -4 },
    };

    // Scroll show/hide, respecting the hold
    useEffect(() => {
        const onScroll = () => {
            if (holdOpen) return;
            const y = window.scrollY;
            setShowHeader(y <= lastYRef.current);
            lastYRef.current = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [holdOpen]); // only rebind when the "hold" changes

    // Pop header when balance changes
    useEffect(() => {
        if (!ready) return;

        if (firstBalanceRender.current) {   // skip the first hydrated run
            firstBalanceRender.current = false;
            return;
        }

        setShowHeader(true);
        setHoldOpen(true);

        const t = window.setTimeout(() => {
            setHoldOpen(false);
        }, 2000);
        return () => window.clearTimeout(t);;
    }, [balance, ready]);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-transform ease-in-out duration-300 pointer-events-none ${showHeader ? "translate-y-0" : "-translate-y-full"
                } py-5`}
        >
            {/* Outer container animates its size smoothly */}
            <motion.div
                className=
                "pointer-events-auto w-1/2 mx-auto rounded-xl shadow-[0px_5.47px_13.68px_0px_rgba(0,0,0,0.15)] overflow-hidden transition-colors duration-150 bg-background-dark/95"
            >
                {/* Top row */}
                <div className="pl-4.5 pr-6 flex items-center justify-between gap-4">
                    {/* Money pill = toggle */}
                    <button
                        type="button"
                        onClick={() => setWalletOpen((v) => !v)}
                        aria-expanded={walletOpen}
                        className={`group self-start
                        font-dm-sans font-semibold text-xs sm:text-lg text-dark-grey-text cursor-pointer`}
                    >
                        <div className="px-1.5 py-1 my-1.5 rounded-md inline-flex flex-col items-start  transition-colors duration-250
                  group-hover:bg-black/7">
                            <div className="leading-none gradient-text-header pb-0.5">
                                your earnings:
                            </div>
                            <motion.div
                                layout
                                className="flex gap-1 items-baseline leading-none pt-0 -translate-y-0.5"
                                transition={{ duration: 1, ease: "easeInOut" }}>

                                <span className="leading-none">$</span>

                                <motion.span
                                    layout="position"
                                    className="text-[24px] leading-none "
                                    transition={{ duration: 1, ease: "easeInOut" }}>
                                    {ready ? <AnimatedBalance value={balance} className="relative inline-block top-[4px]" /> : "—"}
                                </motion.span>

                                <motion.span layout="position"
                                    className="leading-none"
                                    transition={{ duration: 0.5, ease: "easeInOut" }}>k</motion.span>

                                <motion.div
                                    layout="position"
                                    key="info"
                                    variants={infoVariants}
                                    initial={false}
                                    animate={walletOpen ? "open" : "closed"}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    style={{ willChange: "transform,opacity" }}
                                >
                                    <Image
                                        src="/icons/info_icon_v1-01.svg"
                                        width={14}
                                        height={14}
                                        alt="Info"
                                        className="ml-[5px] block"
                                    />
                                </motion.div>
                            </motion.div>
                        </div>

                    </button>

                    <div className="flex items-center gap-2 text-lg">

                        <DevMoneyReset />
                        <OverflowButton />
                        <DevBalanceInput />

                        {/* When closed, show nav; when open, show an (x) button */}
                        <AnimatePresence initial={false} mode="wait">
                            {!walletOpen ? (
                                <motion.nav
                                    key="nav"
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.18 }}
                                    className="flex items-center font-dm-sans font-semibold text-dark-grey-text"
                                >
                                    <Link href="/" className="relative hover:text-custom-red transition-colors px-5 py-1
                                            after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2
                                            after:w-[2.5px] after:h-6 after:bg-header-light/80
                                            last:after:hidden">
                                        home
                                    </Link>
                                    <RewardLink href="/about"
                                        className="relative hover:text-custom-red transition-colors px-5 py-1
                                            after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2
                                            after:w-[2.5px] after:h-6 after:bg-header-light/80
                                            last:after:hidden"
                                        rewardId="header:about"
                                        transparent={false}>
                                        about
                                    </RewardLink>
                                    <RewardLink
                                        href="/documents/Aidan_Chien_resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-custom-red transition-colors pl-5 py-1"
                                        rewardId="header:resume"
                                        transparent={false}
                                    >
                                        resume
                                    </RewardLink>
                                </motion.nav>
                            ) : (
                                <motion.button
                                    key="close"
                                    type="button"
                                    onClick={() => setWalletOpen(false)}
                                    aria-label="Close"
                                    initial={{ opacity: 0, rotate: -90, scale: 0.9 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0.9 }}
                                    transition={{ duration: 0.18 }}
                                    className="leading-none px-[2.5px] py-[2.5px] rounded-md 
                                    hover:bg-black/7 transition-colors duration-250 cursor-pointer"
                                >
                                    <Image
                                        src="/icons/nav_close_button.svg"
                                        width={20}
                                        height={20}
                                        alt="Close"
                                    />

                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Expanded panel (≈3x height). Animates open/close smoothly */}
                <AnimatePresence initial={false}>
                    {walletOpen && (
                        <motion.div
                            key="wallet"
                            // Start with no height and no vertical padding
                            initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                            // Open to your target height + desired padding
                            animate={{ height: 132, opacity: 1, paddingTop: 8, paddingBottom: 16 }} // 8px = pt-2, 16px = pb-4
                            // Close by collapsing height and padding to zero (no Y shift)
                            exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                            transition={{
                                duration: 0.28,
                                ease: "easeInOut",
                            }}
                            style={{ overflow: "hidden" }}   // so content doesn’t spill during collapse
                            className="px-4"                 // keep horizontal padding here
                        >
                            {/* Inner content can keep your margins/gaps */}
                            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                                {/* <QuestSection /> */}
                                <div>
                                    with your money, I would buy...
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </header >
    );
}