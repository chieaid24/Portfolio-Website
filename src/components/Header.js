"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMoney } from "@/lib/money-context";
import QuestSection from "@/components/QuestSection";
import AnimatedBalance from "@/components/AnimatedBalance";
import RewardLink from "@/components/RewardLink";
import DarkModeToggle from "@/components/DarkModeToggle"
import CloseButton from "@/icons/CloseButton"

import DevMoneyReset from "@/components/DevMoneyReset";
import OverflowButton from "@/components/OverflowButton";
import DevBalanceInput from "@/components/DevBalanceInput";

import * as commodityData from "@/app/data/commodities";
import CommodityDisplay from "@/components/CommodityDisplay";

//unify commodity list 
const COMMODITIES = (commodityData.default ?? commodityData.commodities ?? []).filter(
    (c) => c && typeof c.price !== "undefined"
);

// sample items
function sampleDistinct(arr, n) {
    const copy = [...arr];
    // Fisher–Yates shuffle (partial is fine)
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(n, copy.length));
}

// If your balance display is "$Xk", multiply by 1000 for calculations.
// Set to 1 if your balance is already in dollars.
const BALANCE_MULTIPLIER = 1000;

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
    }, [holdOpen]);

    // Pop header when balance changes
    useEffect(() => {
        if (!ready) return;

        if (firstBalanceRender.current) {
            firstBalanceRender.current = false;
            return;
        }

        setShowHeader(true);
        setHoldOpen(true);

        const t = window.setTimeout(() => {
            setHoldOpen(false);
        }, 2000);
        return () => window.clearTimeout(t);
    }, [balance, ready]);

    const picks = useMemo(
        () => (walletOpen ? sampleDistinct(COMMODITIES, 3) : []),
        [walletOpen]
    );

    const dollarBalance = (ready ? balance : 0) * BALANCE_MULTIPLIER;

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-transform ease-in-out duration-300 pointer-events-none ${showHeader ? "translate-y-0" : "-translate-y-full"
                } py-5 font-dm-sans`}
        >
            <motion.div
                className="pointer-events-auto w-1/2 mx-auto rounded-xl shadow-[0px_5.47px_13.68px_0px_rgba(0,0,0,0.15)] overflow-hidden transition-colors duration-150 bg-background-dark/95"
            >
                {/* Top row */}
                <div className="pl-4.5 pr-6 grid grid-cols-[1fr_4fr] justify-between gap-2">
                    <div className="justify-self-start">
                        {/* Money pill = toggle */}
                        <button
                            type="button"
                            onClick={() => setWalletOpen((v) => !v)}
                            aria-expanded={walletOpen}
                            className={`group self-start font-semibold text-xs sm:text-lg text-dark-grey-text cursor-pointer`}
                        >
                            <div className="px-1.5 py-1 my-1.5 rounded-md inline-flex flex-col items-start group-hover:bg-black/7">
                                <div className="leading-none gradient-text-header pb-0.5">
                                    your earnings:
                                </div>
                                <motion.div
                                    layout
                                    className="flex gap-1 items-baseline leading-none pt-0 -translate-y-0.5"
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                >
                                    <span className="leading-none">$</span>
                                    <motion.span
                                        layout="position"
                                        className="text-[24px] leading-none "
                                        transition={{ duration: 1, ease: "easeInOut" }}
                                    >
                                        {ready ? (
                                                <AnimatedBalance value={balance} className="relative inline-block top-[4px] transition-colors duration-250" />
                                        ) : (
                                            "—"
                                        )}
                                    </motion.span>
                                    <motion.span
                                        layout="position"
                                        className="leading-none"
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        k
                                    </motion.span>
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
                    </div>

                    <div className="flex items-center gap-2 text-lg text-dark-grey-text">
                        {/* <DevMoneyReset />  */}
                        {/* <OverflowButton />
                         <DevBalanceInput /> */}

                        <AnimatePresence initial={false} mode="wait">
                            {!walletOpen ? (
                                <motion.nav
                                    key="nav"
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.18 }}
                                    className="flex items-center font-semibold justify-end w-full"
                                >
                                    <Link
                                        href="/"
                                        className="relative hover:text-custom-red transition-colors px-5 py-1
                               after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2
                               after:w-[2.5px] after:h-6 after:bg-header-light/80 last:after:hidden"
                                    >
                                        home
                                    </Link>
                                    <RewardLink
                                        href="/about"
                                        className="relative hover:text-custom-red transition-colors px-5 py-1
                               after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2
                               after:w-[2.5px] after:h-6 after:bg-header-light/80 last:after:hidden"
                                        rewardId="header:about"
                                        transparent={false}
                                    >
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
                                <div className="grid grid-cols-[8fr_1fr] justify-between w-full h-full">
                                    <motion.div
                                        key="with-your-money"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 1, ease: "easeOut" } }}   // 1s in
                                        exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}      // 0.5s out
                                        className="font-semibold text-[22px] tracking-wide self-end justify-self-center translate-y-2"
                                    >
                                        with your money, I would buy...
                                    </motion.div>
                                    <span className="flex items-center space-x-2">

                                        <DarkModeToggle />

                                        <motion.button
                                            key="close"
                                            type="button"
                                            onClick={() => setWalletOpen(false)}
                                            aria-label="Close"
                                            initial={{ opacity: 0, rotate: -90, scale: 0.9 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: 90, scale: 0.9 }}
                                            transition={{ duration: 0.18 }}
                                            className="px-[2.5px] py-[2.5px] rounded-md hover:bg-black/7 transition-colors duration-250 cursor-pointer"
                                        >
                                            <CloseButton className="h-6 w-6 text-dark-grey-text" />
                                        </motion.button>
                                    </span>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Expanded panel */}
                <AnimatePresence initial={false}>
                    {walletOpen && (
                        <motion.div
                            key="wallet"
                            initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                            animate={{ height: "auto", opacity: 1, paddingTop: 0, paddingBottom: 10 }}
                            exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                            transition={{ duration: 0.28, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                            className="pl-4.5 pr-6"
                        >
                            <div className="animate-fade-in-7">
                                <div className="grid grid-cols-1 sm:grid-cols-[1fr_4fr] gap-2 text-sm">
                                    <QuestSection />

                                    <div className="grid grid-cols-[7fr_1fr] mt-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 items-center mb-5 ml-5">
                                            {picks.length === 0 ? (
                                                <p className="text-xs text-gray-400">No commodities available.</p>
                                            ) : (
                                                picks.map((c) => (
                                                    <CommodityDisplay
                                                        key={(c.id ?? c.what)}
                                                        commodity={c}
                                                        balanceInDollars={dollarBalance}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </header>
    );
}
