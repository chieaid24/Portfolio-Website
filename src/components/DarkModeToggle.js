'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";


export default function DarkModeToggle() {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

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
            onClick={() =>setIsDark((v) => !v)}
            initial={{ opacity: 0, rotate: -90, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="px-[2.5px] py-[2.5px] rounded-md hover:bg-black/7 transition-colors duration-250 cursor-pointer"
        >
            <Image
                key={isDark ? "dark" : "light"}
                src={isDark ? "/icons/darkmode_light.svg" : "/icons/darkmode_dark.svg"}
                width={20}
                height={20}
                alt="darkmode_dark"
            />
        </motion.button>
    );
}