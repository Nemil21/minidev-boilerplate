"use client";

import { useUser } from "@/hooks";

/**
 * Navbar component for Farcaster miniapps
 * 
 * NOTE: This is a Farcaster miniapp - wallet connection is handled automatically
 * by the Farcaster SDK. DO NOT add ConnectWallet buttons or manual wallet connection UI.
 * The user's wallet address is available via useUser() hook from the SDK context.
 */
export function Navbar() {
  const { username, displayName, address } = useUser();

  return (
    <nav className="z-40 border-b border-border bg-background">
      <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center">
            <h1 className="truncate text-xl font-heading font-semibold text-foreground sm:text-2xl">
              {/* TODO: Replace with your app name based on user intent */}
              My App
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {/* User info from Farcaster SDK - wallet is auto-connected */}
            {address ? (
              <div className="flex items-center gap-1.5 text-xs sm:gap-2 sm:text-sm">
                <span className="truncate font-medium text-foreground max-w-[120px] sm:max-w-none">
                  {displayName || username || `@${username}`}
                </span>
                {address && (
                  <span className="hidden font-mono text-muted-foreground sm:inline">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}

