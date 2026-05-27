import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "maavie — Ancient Roots. Radiant Skin.",
  description:
    "Maavie brings the ancient wisdom of Korean Hanbang herbal medicine into modern skincare. Formulated with potent botanicals for radiant, healthy skin.",
  keywords: ["hanbang", "Korean skincare", "natural skincare", "body oil", "serum", "maavie"],
  openGraph: {
    title: "maavie — Ancient Roots. Radiant Skin.",
    description:
      "Korean Hanbang skincare rooted in centuries of herbal wisdom. Discover our potent botanical formulas.",
    siteName: "maavie",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FDFAF5] text-[#1A1209]">
        {children}
      </body>
    </html>
  );
}
