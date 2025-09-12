'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useMoney } from "@/lib/money-context"

export default function DarkModeToggle() {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const { getAllQuestsComplete, ready } = useMoney();
    const allQuestComp = getAllQuestsComplete();
    const canToggle = ready && allQuestComp;


    // On mount, read from the DOM/localStorage (no system check)
    useEffect(() => {
        setMounted(true);
        try {
            const saved = localStorage.getItem("theme");     // 'dark' | 'light' | null
            const initial = saved === "dark";                // default false (light) if null
            setIsDark(initial);
        } catch {
            setIsDark(false);
        }
    }, []);

    // Apply class + persist
    useEffect(() => {
        if (!mounted) return;
        const root = document.documentElement;
        root.classList.toggle("dark", isDark);
        root.style.colorScheme = isDark ? "dark" : "light";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark, mounted]);

    if (!mounted) return null;

    return (
            <motion.button
                key="darkmode"
                type="button"
                aria-label="Dark Mode"
                title={canToggle ? undefined : "Complete all quests to unlock!"}
                onClick={() => canToggle && setIsDark((v) => !v)}
                initial={{ opacity: 0, rotate: -90, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className={`px-[2.5px] py-[2.5px] rounded-md ${canToggle ? "hover:bg-black/7 cursor-pointer" : "cursor-default"} transition-colors duration-250 `}
            >

                <Image
                    key={isDark ? "dark" : "light"}
                    src={isDark ? "/icons/darkmode_light.svg" : "/icons/darkmode_dark.svg"}
                    width={20}
                    height={20}
                    alt="darkmode_dark"
                    className={canToggle ? "opacity-100" : "opacity-70"}
                />
            </motion.button>

    );
}