'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNavBar from './BottomNavBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isTestMode, setIsTestMode] = useState<boolean>(false);
  const [listenerConnected, setListenerConnected] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-row font-sans selection:bg-slate-900 selection:text-white relative">
      {/* Navigation Sidebar (Desktop + Mobile Drawer) */}
      <Sidebar
        isTestMode={isTestMode}
        listenerConnected={listenerConnected}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <Header
          isTestMode={isTestMode}
          setIsTestMode={setIsTestMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          refreshData={handleRefresh}
          isRefreshing={isRefreshing}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* Dynamic Page Body with Responsive & Bottom-Nav Safe Padding */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-5 sm:py-6 pb-24 lg:pb-8 w-full">
          {children}
        </main>

        {/* Mobile Native-style Bottom Navigation Bar */}
        <BottomNavBar />
      </div>
    </div>
  );
}
