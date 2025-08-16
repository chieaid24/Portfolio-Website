import { DM_Sans } from "next/font/google";
import "./globals.css";
import ScrollProgressBarClient from "@/components/ScrollProgressBarClient";
import Header from "@/components/Header";                 // <-- your header
import Providers from "./providers.js";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: { default: "AIDAN CHIEN", template: "%s || AIDAN CHIEN" },
  description: "AIDAN CHIEN's Portfolio Website",
  icons: { icon: "favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`${dmSans.variable} antialiased min-h-screen`}>
          <Providers>
            <ScrollProgressBarClient />
            <Header />           {/* balance appears next to your logo */}
            <main>{children}</main>
          </Providers>
      </body>
    </html>
  );
}