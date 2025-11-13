import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const headingFont = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farcaster Miniapp",
  description: "A web3 miniapp for Farcaster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${funnelSans.variable} ${headingFont.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
