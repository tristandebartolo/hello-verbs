"use client";

import { Sidebar } from "@/components/Sidebar";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Sidebar />
      <main className="md:pl-72">
        {children}
      </main>
    </div>
  );
}
