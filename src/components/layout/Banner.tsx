"use client";

import Image from "next/image";
import Link from "next/link";

export function Banner() {
  return (
    <div className="border-b border-border sticky top-0 z-50 bg-background py-2">
      <Link href="https://minidev.fun" target="_blank" className="container mx-auto flex items-center justify-center gap-2 px-4">
        <p className="text-base font-medium text-muted-foreground sm:text-sm">
          Made with
        </p>
        <Image
          src="/minidev-logo.png"
          alt="MiniDev Logo"
          width={24}
          height={24}
          className="h-6 w-22 object-cover"
          unoptimized
        />
      </Link>
    </div>
  );
}