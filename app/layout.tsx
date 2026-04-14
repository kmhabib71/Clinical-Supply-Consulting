import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Clinical Supply Consulting — End-to-End Clinical Trial Supply Chain",
  description:
    "Clinical Supply Consulting delivers senior-led clinical trial supply chain management across Phase I–III programs in 80+ countries. No junior staff. No hand-offs. Just 20+ years of sponsor-side expertise, applied directly to your program.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-[#f4f6fa] text-[#0d1b2a] antialiased">
        {children}
      </body>
    </html>
  );
}
