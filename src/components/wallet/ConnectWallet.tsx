'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/Button';
import { truncateAddress } from '@/lib/utils';

export function ConnectWallet() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    if (isConnected) {
        return (
            <div className="miniapp-card rounded-lg p-6 text-center space-y-4">
                <h2 className="text-xl font-semibold text-white">Wallet Connected</h2>
                <p className="text-sm text-gray-300">
                    {address ? truncateAddress(address) : 'No address connected'}
                </p>
                <Button
                    onClick={() => disconnect()}
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    Disconnect
                </Button>
            </div>
        );
    }

    return (
        <div className="miniapp-card rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white text-center">Connect Wallet</h2>
            <div className="space-y-2">
                {connectors.map((connector) => (
                    <Button
                        key={connector.uid}
                        onClick={() => connect({ connector })}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Connect {connector.name}
                    </Button>
                ))}
            </div>
        </div>
    );
} 