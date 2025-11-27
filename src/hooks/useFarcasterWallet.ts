"use client";

import { useState, useCallback } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useConnect, useAccount } from "wagmi";

/**
 * Hook for programmatic wallet access in Farcaster miniapps.
 * 
 * Use this when you need to ensure wallet is connected before a transaction.
 * For most cases, useUser() already auto-connects the wallet.
 * 
 * Usage:
 * ```tsx
 * import { useFarcasterWallet } from '@/hooks/useFarcasterWallet';
 * 
 * function MyComponent() {
 *   const { connectWallet, isConnecting, address, error } = useFarcasterWallet();
 * 
 *   const handleTransaction = async () => {
 *     // Ensure wallet is connected before transaction
 *     const walletAddress = await connectWallet();
 *     if (walletAddress) {
 *       // Proceed with transaction using wagmi hooks
 *     }
 *   };
 * }
 * ```
 */
export function useFarcasterWallet() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  const connectWallet = useCallback(async (): Promise<`0x${string}` | null> => {
    // If already connected, return current address
    if (isConnected && address) {
      return address;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Check if in Farcaster miniapp
      const isMiniApp = await sdk.isInMiniApp();
      
      if (!isMiniApp) {
        setError("Not running in a Farcaster miniapp");
        setIsConnecting(false);
        return null;
      }

      // Request wallet access via Farcaster SDK ethProvider
      const ethProvider = sdk.wallet.ethProvider;
      if (!ethProvider) {
        setError("Farcaster wallet provider not available");
        setIsConnecting(false);
        return null;
      }

      const accounts = await ethProvider.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];

      if (!accounts || accounts.length === 0) {
        setError("No accounts returned from wallet");
        setIsConnecting(false);
        return null;
      }

      const connectedAddress = accounts[0] as `0x${string}`;
      console.log('✅ Wallet connected via Farcaster SDK:', connectedAddress);

      // Connect wagmi to the farcasterMiniApp connector
      const farcasterConnector = connectors.find(c => c.id === 'farcasterMiniApp');
      if (farcasterConnector) {
        connect({ connector: farcasterConnector });
      }

      setIsConnecting(false);
      return connectedAddress;

    } catch (err) {
      console.error('Wallet connection failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      setIsConnecting(false);
      return null;
    }
  }, [isConnected, address, connect, connectors]);

  return {
    connectWallet,
    isConnecting,
    isConnected,
    address,
    error,
  };
}

