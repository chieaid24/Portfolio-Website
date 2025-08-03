"use client";

import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            
            // Show/hide based on scroll position
            setIsVisible(currentScroll > 0);
            
            // Calculate how far down the track the indicator should be
            // We need to account for the indicator's own height (64px = h-16) and bottom padding (16px)
            const trackHeight = window.innerHeight - 64 - 10; // 64px for h-16, 16px bottom padding
            const progress = totalHeight > 0 ? (currentScroll / totalHeight) * trackHeight : 0;
            
            setScrollProgress(Math.min(trackHeight, Math.max(0, progress)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Set initial state
        
        // Handle resize events to recalculate on window resize
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Hide default scrollbar by adding CSS to document head
        const style = document.createElement('style');
        style.textContent = `
            /* Hide scrollbar for Chrome, Safari and Opera */
            ::-webkit-scrollbar {
                display: none;
            }
            
            /* Hide scrollbar for IE, Edge and Firefox */
            html {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            
            body {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
        `;
        document.head.appendChild(style);

        // Cleanup function to remove the style when component unmounts
        return () => {
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, []);

    return (
        <div className={`fixed right-[2px] w-3 h-full bg-gray-400/15 z-[100] pointer-events-none transition-opacity duration-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div 
                className={`w-full h-16 bg-custom-red transition-all duration-150 ease-out shadow-sm rounded-full ${isVisible ? 'translate-y-0 duration-300' : '-translate-y-30 duration-300'}`}
                style={{ 
                    transform: `translateY(${scrollProgress}px)`
                }}
            />
        </div>
    );
}