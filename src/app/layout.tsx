import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import FloatingBadge from "@/components/FloatingBadge";
import { LenisProvider } from "@/components/providers/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grandeur - 5-Star Luxury Hotel & Resort",
  description: "Experience unparalleled luxury at Grandeur - where timeless elegance meets modern sophistication. A 5-star sanctuary for discerning travelers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning={true}>
        <LenisProvider>
          {children}
          <FloatingBadge />
        </LenisProvider>
      </body>
    </html>
  );
}
