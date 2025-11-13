"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { truncateAddress } from "@/lib/utils";
import { Button } from "../ui/button";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="miniapp-card rounded-lg p-6 text-center space-y-4">
        <h2 className="text-xl font-semibold text-card-foreground">
          Wallet Connected
        </h2>
        <p className="text-sm text-muted-foreground">
          {address ? truncateAddress(address) : "No address connected"}
        </p>
        <Button onClick={() => disconnect()} variant="destructive">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="miniapp-card rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-card-foreground text-center">
        Connect Wallet
      </h2>
      <div className="flex flex-col space-y-2 w-fit mx-auto">
        {connectors.map((connector) => (
          <Button key={connector.uid} onClick={() => connect({ connector })}>
            Connect {connector.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
