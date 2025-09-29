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
        {/* Charset & Viewport */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Portfolio of Aidan Chien, systems engineer specializing in design and development."
        />
        <meta
          name="keywords"
          content="Aidan Chien, systems engineer, portfolio, web development, design, coding"
        />
        <meta name="author" content="Aidan Chien" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://aidanchien.com" />
        <meta property="og:site_name" content="Aidan Chien Portfolio" />
        <meta property="og:title" content="Aidan Chien's Portfolio" />
        <meta
          property="og:description"
          content="Portfolio of Aidan Chien, displaying software development, mechanical design, and interactive projects."
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Aidan Chien's Portfolio" />
        <meta name="twitter:description" content="Portfolio of Aidan Chien, displaying software development, mechanical design, and interactive projects." />
        {/* Canonical */}
        <link rel="canonical" href="https://aidanchien.com" />
        {/** JSON-LD */}
        <Script
          id="structured-data-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aidan Chien",
              url: "https://aidanchien.com",
              image: "https://aidanchien.com/about/about_image_1.png",
              sameAs: [
                "https://www.linkedin.com/in/aidanchien",
                "https://github.com/chieaid24",
              ],
              jobTitle: "Systems Engineer Student",
            }),
          }}
        />

        <Script
          id="structured-data-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://aidanchien.com",
              name: "Aidan Chien Portfolio",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://aidanchien.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
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
