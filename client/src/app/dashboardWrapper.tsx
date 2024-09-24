'use client';

import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import StoreProvider, { useAppSelector } from '@/redux/store';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed, isDarkMode } = useAppSelector((state) => state.global);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Side bar */}
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${isSidebarCollapsed ? '' : 'md:pl-64'}`}
      >
        {/* Nav bar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
}
