import { DM_Sans, Italiana } from "next/font/google";
import localFont from "next/font/local"
import Script from 'next/script'
import "./globals.css";
import ScrollProgressBarClient from "@/components/ScrollProgressBarClient";
import Header from "@/components/Header";                 // <-- your header
import Footer from "@/components/Footer"
import Providers from "./providers.js";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});
const italiana = Italiana({ subsets: ['latin'], weight: '400', variable: '--font-italiana' });

const clashFont = localFont({
  src: [
    { path: './fonts/Clash_Regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/Clash_Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-clash',   // exposes a CSS var
  display: 'swap',             // good UX
  fallback: ['system-ui', 'Segoe UI', 'Arial'],
})

export const metadata = {
  title: { default: "AIDAN CHIEN", template: "%s || AIDAN CHIEN" },
  description: "AIDAN CHIEN's Portfolio Website",
  icons: { icon: "favicon.ico" },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}; 

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              var saved = localStorage.getItem('theme');     // 'dark' | 'light' | null
              var isDark = saved === 'dark';                 // default light if null
              var root = document.documentElement;
              root.classList.toggle('dark', isDark);
              root.style.colorScheme = isDark ? 'dark' : 'light';
            } catch (_) {}
          `}
        </Script>
      </head>
      <body className={`${dmSans.className} ${italiana.variable} ${clashFont.variable} antialiased min-h-screen`}>
        <Providers>
          <ScrollProgressBarClient />
          <Header />           {/* balance appears next to your logo */}
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}