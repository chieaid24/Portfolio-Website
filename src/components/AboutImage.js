'use client';

import { useState, useEffect } from "react";
import Image from "next/image"
import ArrowIcon from "@/icons/ArrowIcon"

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)"); // Tailwind md breakpoint
        const handler = (e) => setIsMobile(e.matches);
        setIsMobile(mql.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    return isMobile;
}

export default function AboutImage({ className = '' }) {
    const [imageHovered, setImageHovered] = useState(false);
    const isMobile = useIsMobile();

    return (
        <div className={`flex justify-center mobile:select-none ${className}`}> {/* #horiz arrow + (Image + label) */}
            <div className={`flex items-end mb-2 md:mb-4 mr-0.5 transition-opacity ease-in-out ${imageHovered || isMobile ? 'opacity-100 duration-300' : 'opacity-0 duration-600'}`}>
                <ArrowIcon className="scale-60 md:scale-80 opacity-90" />
            </div>
            <div className="flex flex-col gap-1 "> {/* #vertical Image + label  */}
                <div className="relative w-[170px] sm:w-[250px] md:w-[400px] h-[170px] sm:h-[250px] md:h-[400px]">
                    <Image src="/about/about_image_1.png"
                        alt="A photo of Aidan Chien"
                        fill
                        onMouseEnter={() => setImageHovered(true)}
                        onMouseLeave={() => setImageHovered(false)}
                        className="rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                    />
                </div>
                <div>
                    <p className={`block text-sm md:text-xl font-medium text-light-grey-text font-dm-sans transition-opacity ease-in-out ${imageHovered || isMobile ? 'opacity-100 duration-300' : 'opacity-0 duration-600'}`}>
                        at Maasai Mara National Park :{")"}
                    </p>
                </div>
            </div>
        </div>
    )
}