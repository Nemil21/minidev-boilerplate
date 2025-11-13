'use client';

import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { Tabs } from '@/components/ui/Tabs';
import { useUser } from '@/hooks';

export default function App() {
  const {
    username,
    displayName,
    address,
    fid,
    isMiniApp,
    isLoading
  } = useUser();

  if (isLoading) {
    return (
      <div className="miniapp-container">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-white">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  // Determine display name based on context
  const userDisplayName = isMiniApp
    ? (displayName || username)
    : (address ? `Wallet: ${address.slice(0, 6)}...${address.slice(-4)}` : null);

  const welcomeMessage = userDisplayName
    ? `Welcome, ${userDisplayName}`
    : 'Connect wallet and start building';

  // Tab content
  const tabs = [
    {
      id: 'tab1',
      title: 'Tab1',
      content: (
        <div className="space-y-4">
          <h1>Tab 1 Content</h1>
        </div>
      )
    },
    {
      id: 'tab2',
      title: 'Tab2',
      content: (
        <div className="space-y-4">
          <h1>Tab 2 Content</h1>
        </div>
      )
    }
  ];

  return (
    <div className="miniapp-container">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {isMiniApp ? 'Farcaster Miniapp' : 'Web3 App'}
          </h1>
          <p className="text-lg text-gray-200">
            {welcomeMessage}
          </p>
        </header>

        {isMiniApp ? (
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">Farcaster User Info</h3>
            <div className="space-y-1 text-sm">
              {fid && <p>FID: {fid}</p>}
              {username && <p>Username: @{username}</p>}
              {displayName && <p>Display Name: {displayName}</p>}
              {address && <p>Address: {address.slice(0, 6)}...{address.slice(-4)}</p>}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <ConnectWallet />
            {address && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-2">Wallet Info</h3>
                <p className="text-sm font-mono">
                  {address}
                </p>
              </div>
            )}
          </div>
        )}

        <main className="max-w-2xl mx-auto my-4">
          <Tabs tabs={tabs} defaultTab="tab1" />
        </main>
      </div>
    </div>
  );
}
