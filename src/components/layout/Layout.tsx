"use client";

import { ReactNode } from "react";
import { Banner } from "./Banner";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Banner />
      <Navbar />
      <main className="flex-1 overflow-x-hidden bg-background">{children}</main>
    </div>
  );
}

