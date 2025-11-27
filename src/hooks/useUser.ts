"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { sdk } from "@farcaster/miniapp-sdk";

/**
 * Unified user hook that works for both Farcaster miniapp and regular browser environments
 * 
 * IMPORTANT: For Farcaster miniapps, wallet connection is AUTOMATIC via the SDK.
 * DO NOT add ConnectWallet buttons or manual wallet connection UI.
 *
 * Usage:
 * ```tsx
 * import { useUser } from '@/hooks';
 *
 * function MyComponent() {
 *   const { address, username, isMiniApp, isLoading } = useUser();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *
 *   if (isMiniApp) {
 *     return <div>Hello {username}! Wallet: {address}</div>;
 *   } else {
 *     return <div>Wallet: {address}</div>;
 *   }
 * }
 * ```
 */

interface FarcasterUser {
  fid: number;
  primaryAddress?: `0x${string}`;
  displayName?: string;
  username?: string;
  pfpUrl?: string;
  location?: {
    placeId?: string;
    description?: string;
  } | null;
}

export interface UserData {
  // Common fields
  address?: `0x${string}`;

  // Farcaster-specific fields (only available in miniapp)
  fid?: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
  location?: {
    placeId?: string;
    description?: string;
  } | null;

  // Meta information
  isMiniApp: boolean;
  isLoading: boolean;
  isWalletConnected: boolean;
  error?: string;
}

export function useUser(): UserData {
  const [userData, setUserData] = useState<UserData>({
    isMiniApp: false,
    isLoading: true,
    isWalletConnected: false,
  });

  // Wagmi hooks for wallet connection
  const { address: walletAddress, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    let isMounted = true;

    async function initializeUser() {
      try {
        setUserData((prev: UserData) => ({ ...prev, isLoading: true, error: undefined }));

        // Check if running in a Farcaster Mini App
        const isMiniApp = await sdk.isInMiniApp();

        if (isMiniApp) {
          // Farcaster miniapp flow
          try {
            // Get user context from SDK
            const userContext = await sdk.context;
            const farcasterUser: FarcasterUser | null = userContext.user;

            if (farcasterUser && isMounted) {
              // Try to fetch additional user data from API
              let apiUserData = null;
              try {
                const res = await sdk.quickAuth.fetch("/api/me");
                if (res.ok) {
                  apiUserData = await res.json();
                }
              } catch (apiError) {
                console.warn(
                  "Failed to fetch additional user data from API:",
                  apiError
                );
              }

              // AUTO-CONNECT WALLET via Farcaster SDK ethProvider
              // This is the key for blockchain functionality in Farcaster miniapps
              // No ConnectWallet button needed - this happens automatically!
              let connectedAddress = farcasterUser.primaryAddress || apiUserData?.primaryAddress;
              
              try {
                // Request wallet access from Farcaster SDK
                const ethProvider = sdk.wallet.ethProvider;
                if (ethProvider) {
                  const accounts = await ethProvider.request({ 
                    method: 'eth_requestAccounts' 
                  }) as string[];
                  
                  if (accounts && accounts.length > 0) {
                    connectedAddress = accounts[0] as `0x${string}`;
                    console.log('✅ Farcaster wallet connected:', connectedAddress);
                    
                    // Connect wagmi to the farcasterMiniApp connector
                    const farcasterConnector = connectors.find(c => c.id === 'farcasterMiniApp');
                    if (farcasterConnector && !isConnected) {
                      connect({ connector: farcasterConnector });
                    }
                  }
                }
              } catch (walletError) {
                console.warn('Wallet connection skipped (user may have declined or no wallet):', walletError);
                // Not an error - user might not have a wallet or declined
              }

              setUserData({
                address: connectedAddress,
                fid: farcasterUser.fid,
                username: farcasterUser.username,
                displayName: farcasterUser.displayName,
                pfpUrl: farcasterUser.pfpUrl,
                location: farcasterUser.location,
                isMiniApp: true,
                isLoading: false,
                isWalletConnected: !!connectedAddress,
              });

              // Signal that the app is ready
              sdk.actions.ready();
            } else if (isMounted) {
              setUserData({
                isMiniApp: true,
                isLoading: false,
                isWalletConnected: false,
                error: "Unable to get user data from Farcaster",
              });
            }
          } catch (farcasterError) {
            console.error("Farcaster authentication failed:", farcasterError);
            if (isMounted) {
              setUserData({
                isMiniApp: true,
                isLoading: false,
                isWalletConnected: false,
                error: "Farcaster authentication failed",
              });
            }
          }
        } else {
          // Regular browser flow - just use wallet connection
          if (isMounted) {
            setUserData({
              address: isConnected && walletAddress ? walletAddress as `0x${string}` : undefined,
              isMiniApp: false,
              isLoading: false,
              isWalletConnected: isConnected,
            });
          }
        }
      } catch (error) {
        console.error("Error initializing user:", error);
        if (isMounted) {
          setUserData({
            isMiniApp: false,
            isLoading: false,
            isWalletConnected: false,
            error: "Failed to initialize user data",
          });
        }
      }
    }

    initializeUser();

    return () => {
      isMounted = false;
    };
  }, [walletAddress, isConnected, connect, connectors]);

  return userData;
}
