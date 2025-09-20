"use client";

import { usePathname } from "next/navigation";
import { DM_Sans, Italiana } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import ScrollProgressBarClient from "@/components/ScrollProgressBarClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers.js";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const italiana = Italiana({ subsets: ["latin"], weight: "400", variable: "--font-italiana" });
const clashFont = localFont({
  src: [
    { path: "./fonts/Clash_Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Clash_Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en" className={`${dmSans.variable} text-[16px] bg-background-light`}>
      <head>
        <link rel="preconnect" href="https://open.spotify.com" />
        <link rel="preconnect" href="https://i.scdn.co" />
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              var saved = localStorage.getItem('theme');
              var isDark = saved === 'dark';
              var root = document.documentElement;
              root.classList.toggle('dark', isDark);
              root.style.colorScheme = isDark ? 'dark' : 'light';
            } catch (_) {}
          `}
        </Script>
      </head>
      <body
        className={`${dmSans.className} ${italiana.variable} ${clashFont.variable} antialiased min-h-screen overscroll-none`}
      >
        <Providers>
          <main key={pathname} className="fade-in-page">
            <ScrollProgressBarClient />
            <Header />
            {children}
            <Footer />
          </main>

        </Providers>
      </body>
    </html>
  );
}
