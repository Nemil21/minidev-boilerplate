"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks";
import { truncateAddress } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Navbar() {
  const { username, displayName, address, isMiniApp } = useUser();
  const { address: walletAddress, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <nav className="z-40 border-b border-border bg-background">
      <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center">
            <h1 className="truncate text-xl font-heading font-semibold text-foreground sm:text-2xl">
              {/* {isMiniApp ? "Farcaster Miniapp" : "Web3 App"} */}
              Farcaster Miniapp
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {isMiniApp ? (
              address ? (
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
              ) : null
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                {isConnected && walletAddress ? (
                  <>
                    <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 sm:gap-2">
                      <span className="hidden text-xs font-mono text-muted-foreground pl-2 sm:inline sm:text-sm">
                        {truncateAddress(walletAddress)}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground sm:hidden">
                        {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                      </span>
                      <Button
                        onClick={() => handleCopy(walletAddress)}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 sm:h-7 sm:w-7"
                        title="Copy address"
                      >
                        {copied ? (
                          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        )}
                      </Button>
                    </div>
                    <Button
                      onClick={() => disconnect()}
                      variant="destructive"
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">Disconnect</span>
                      <span className="sm:hidden">Disc</span>
                    </Button>
                  </>
                ) : (
                  connectors.map((connector) => (
                    <Button
                      key={connector.uid}
                      onClick={() => connect({ connector })}
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">Connect {connector.name}</span>
                      <span className="sm:hidden">Connect</span>
                    </Button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

