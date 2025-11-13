'use client';

import { useState } from 'react';

interface Tab {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex gap-2 mb-8 bg-white/5 p-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3 px-4 text-center font-semibold rounded-lg transition-all duration-200 ${activeTab === tab.id
                                ? 'text-white bg-primary shadow-lg shadow-primary/20 scale-[1.02]'
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px] p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                {activeTabContent}
            </div>
        </div>
    );
} 