"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMoney } from "@/lib/money-context";

import DevMoneyReset from '@/components/DevMoneyReset';

export default function Header() {
    const [isLogoHovered, setLogoHovered] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { balance, ready } = useMoney();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                // scrolling down
                setShowHeader(false);
            } else {
                // scrolling up
                setShowHeader(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);


    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-transform ease-in-out duration-300 pointer-events-none ${showHeader ? 'translate-y-0' : '-translate-y-full'} py-5`}>
            <div className="pointer-events-auto bg-background-dark w-1/2 mx-auto flex justify-between items-center gap-10 px-4 rounded-xl shadow-[0px_5.471670627593994px_13.679177284240723px_0px_rgba(0,0,0,0.15)]">
                <Link href="/" onMouseEnter={() => setLogoHovered(true)} onMouseLeave={() => setLogoHovered(false)}>
                    {/* 1. Wrap Image in a div with relative positioning and a defined size */}
                    <div className="relative h-12 w-12">
                        <Image
                            src="/logo-2.svg"
                            fill // 2. Use fill to make the image expand to the parent
                            alt="Portfolio Logo" // 3. Add alt text for accessibility
                            style={{ objectFit: 'contain' }} // 4. Ensure the image scales correctly
                            className={`p-2 transition-opacity ease-in-out ${isLogoHovered ? 'opacity-0 duration-0' : 'opacity-100 duration-300'}`}
                        />
                        <Image
                            src="/home.svg"
                            fill // 2. Use fill to make the image expand to the parent
                            alt="Portfolio Logo" // 3. Add alt text for accessibility
                            style={{ objectFit: 'contain' }} // 4. Ensure the image scales correctly
                            className={`p-1 transition-opacity ease-in-out ${isLogoHovered ? 'opacity-100 duration-300' : 'opacity-0 duration-300'}`}
                        />
                    </div>
                </Link>

                {/* Money pill (next to logo) */}
                <div
                    className="font-mono text-xs sm:text-sm px-2.5 py-1 rounded-full bg-gray-100 text-gray-900"
                    title="Your balance"
                >
                    {ready ? `💰 $${balance}` : '—'}
                </div>
                <DevMoneyReset />



                <div className="flex items-center gap-4 font-dm-sans font-semibold">
                    <Link href="/about" className="hover:text-custom-red transition-colors">
                        about
                    </Link>
                    <Link href="/documents/Aidan_Chien_resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-custom-red transition-colors">
                        resume
                    </Link>
                </div>
            </div>
        </header>
    )
}