"use client";

import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Banner } from "./banner";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Banner />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}

