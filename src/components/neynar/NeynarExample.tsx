"use client";

import { Button } from "@/components/ui/button";
import { useNeynar } from "@/hooks";
import { Card, CardHeader, CardTitle, CardPanel } from "@/components/ui/card";

/**
 * Example component demonstrating Neynar SDK usage
 * 
 * This component shows how to use Neynar SDK features like:
 * - Checking if SDK is loaded
 * - Accessing miniapp context
 * - Adding the miniapp to user's home
 */
export function NeynarExample() {
  const { isSDKLoaded, context, addMiniApp, isInstalled } = useNeynar();

  const handleAddMiniApp = async () => {
    if (!isSDKLoaded) {
      console.warn("Neynar SDK not loaded");
      return;
    }

    try {
      await addMiniApp();
      console.log("Mini app add request sent successfully!");
    } catch (error: any) {
      if (error?.name === "AddMiniApp.RejectedByUser") {
        console.log("User cancelled adding mini app");
      } else {
        console.error("Error adding mini app:", error);
      }
    }
  };

  if (!isSDKLoaded) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Neynar SDK</CardTitle>
        </CardHeader>
        <CardPanel>
          <p className="text-sm text-muted-foreground">
            Neynar SDK is not loaded. This feature is only available in Farcaster miniapps.
          </p>
        </CardPanel>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Neynar SDK Integration</CardTitle>
      </CardHeader>
      <CardPanel className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">SDK Status:</p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>SDK Loaded: {isSDKLoaded ? "Yes" : "No"}</p>
            <p>App Installed: {isInstalled ? "Yes" : "No"}</p>
          </div>
        </div>

        {context && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Context:</p>
            <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(context, null, 2)}
            </pre>
          </div>
        )}

        {!isInstalled && (
          <Button onClick={handleAddMiniApp} className="w-full">
            Add Mini App to Home
          </Button>
        )}

        {isInstalled && (
          <p className="text-sm text-muted-foreground">
           This mini app is installed on your home screen
          </p>
        )}
      </CardPanel>
    </Card>
  );
}

