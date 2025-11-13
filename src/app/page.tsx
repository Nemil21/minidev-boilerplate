"use client";

import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { useUser } from "@/hooks";
import { NeynarExample } from "@/components/neynar/NeynarExample";

export default function App() {
  const { isLoading } = useUser();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="text-foreground">Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  // Tab content
  const tabs = [
    {
      id: "tab1",
      title: "Tab1",
      content: (
        <div className="space-y-4">
          <h1>Tab 1 Content</h1>
          <NeynarExample />
        </div>
      ),
    },
    {
      id: "tab2",
      title: "Tab2",
      content: (
        <div className="space-y-4">
          <h1>Tab 2 Content</h1>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <Tabs defaultValue="tab1">
          <TabsList className="w-full">
            {tabs.map((tab) => (
              <TabsTab key={tab.id} value={tab.id}>
                {tab.title}
              </TabsTab>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsPanel key={tab.id} value={tab.id} className="mt-4">
              {tab.content}
            </TabsPanel>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
