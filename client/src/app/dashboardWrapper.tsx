import React from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Side bar */}
      <Sidebar />
      <main className="flex w-full flex-col bg-gray-50 dark:bg-dark-bg md:pl-64">
        {/* Nav bar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
}
