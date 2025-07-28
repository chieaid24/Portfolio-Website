import { DM_Sans } from "next/font/google";
import { Unna } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "AIDAN CHIEN",
    template: "%s || AIDAN CHIEN"
  },
  description: "AIDAN CHIEN's Portfolio Website",
  icons: {
    icon: "favicon.ico"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body
        className={`${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
