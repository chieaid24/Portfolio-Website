"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMoney } from "@/lib/money-context";
import DevMoneyReset from "@/components/DevMoneyReset"; // <- use your wrapper"
import AnimatedBalance from "@/components/AnimatedBalance";

export default function Header() {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [walletOpen, setWalletOpen] = useState(false);

    const { balance, ready } = useMoney();

    const infoVariants = {
        closed: { opacity: 1, y: 0 },
        open: { opacity: 0, y: -4 },
    };

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setShowHeader(y <= lastScrollY);
            setLastScrollY(y);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-transform ease-in-out duration-300 pointer-events-none ${showHeader ? "translate-y-0" : "-translate-y-full"
                } py-5`}
        >
            {/* Outer container animates its size smoothly */}
            <motion.div
                className="pointer-events-auto bg-background-dark w-1/2 mx-auto rounded-xl shadow-[0px_5.471670627593994px_13.679177284240723px_0px_rgba(0,0,0,0.15)] overflow-hidden"
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
                            <div className="leading-none gradient-text-header">
                                your earnings:
                            </div>
                            <div className="flex gap-1 items-baseline leading-none">
                                <div className="leading-none">
                                    $
                                </div>
                                <div className="text-[24px] my-0 leading-none">
                                    {ready ? <AnimatedBalance value={balance} /> : "—"}
                                </div>
                                <div className="leading-none">
                                    k
                                </div>
                                <motion.div
                                    key="info"
                                    variants={infoVariants}
                                    initial={false}
                                    animate={walletOpen ? "open" : "closed"}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    style={{ willChange: 'transform, opacity' }}
                                >
                                    <Image
                                        src="/icons/info_icon_v1-01.svg"
                                        width={14}
                                        height={14}
                                        alt="Close"
                                        className={`ml-[5px]`} />
                                </motion.div>
                            </div>
                        </div>

                    </button>

                    <div className="flex items-center gap-2 text-lg">
                        <DevMoneyReset />
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
                                    <Link href="/about" className="relative hover:text-custom-red transition-colors px-5 py-1
                                            after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2
                                            after:w-[2.5px] after:h-6 after:bg-header-light/80
                                            last:after:hidden">
                                        about
                                    </Link>
                                    <Link
                                        href="/documents/Aidan_Chien_resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-custom-red transition-colors pl-5 py-1"
                                    >
                                        resume
                                    </Link>
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
                                <div className="font-mono">
                                    <div className="opacity-70">current balance</div>
                                    <div className="text-2xl">
                                        {ready ? `$${typeof balance === 'number' ? balance.toFixed(2) : balance}` : "—"}
                                    </div>
                                </div>
                                <div className="flex items-end justify-end gap-2">
                                    <Link href="/about" className="text-xs underline opacity-70 hover:opacity-100">
                                        how it works
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </header >
    );
}