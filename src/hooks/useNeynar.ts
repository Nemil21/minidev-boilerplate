"use client";

import { useMiniApp } from "@neynar/react";
import { useUser } from "./useUser";

/**
 * Hook to access Neynar SDK functionality
 * 
 * Usage:
 * ```tsx
 * import { useNeynar } from '@/hooks';
 * 
 * function MyComponent() {
 *   const { isSDKLoaded, context, addMiniApp } = useNeynar();
 *   
 *   if (!isSDKLoaded) return <div>Loading...</div>;
 *   
 *   return <div>User: {context?.user?.username}</div>;
 * }
 * ```
 */
export function useNeynar() {
  const { isMiniApp } = useUser();
  const neynar = useMiniApp();

  // Only return Neynar functionality if in miniapp
  if (!isMiniApp) {
    return {
      isSDKLoaded: false,
      context: null,
      addMiniApp: async () => ({ added: false }),
      isInstalled: false,
    };
  }

  return {
    isSDKLoaded: neynar.isSDKLoaded,
    context: neynar.context,
    addMiniApp: neynar.actions.addMiniApp,
    isInstalled: neynar.added,
  };
}

