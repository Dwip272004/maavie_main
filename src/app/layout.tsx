import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "maavie — Made for every stage of womanhood.",
  description:
    "Maavie brings safe, effective skincare to every stage of a woman's life — from pregnancy to menopause. Formulated with clinically proven natural ingredients.",
  keywords: ["pregnancy skincare", "menopause skincare", "hormonal skincare", "natural skincare", "maavie"],
  openGraph: {
    title: "maavie — Made for every stage of womanhood.",
    description:
      "Safe, effective skincare for every hormonal stage. Nature. Science. Truth.",
    siteName: "maavie",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#231F20]">
        {children}
      </body>
    </html>
  );
}
