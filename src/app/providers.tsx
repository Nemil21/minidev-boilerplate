'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MiniAppProvider } from '@neynar/react';
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit'; // REMOVED: Not needed for Farcaster-only auth
import { config } from '@/lib/wagmi';
// import '@rainbow-me/rainbowkit/styles.css'; // REMOVED: Not needed for Farcaster-only auth

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <MiniAppProvider analyticsEnabled={true}>
                    {/* RainbowKitProvider removed - causes MetaMask to show up */}
                    {/* Farcaster mini apps use WagmiProvider with farcasterMiniApp connector */}
                    {/* Neynar MiniAppProvider provides additional SDK functionality */}
                    {children}
                </MiniAppProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
} 