"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { CookieConsent } from "@/components/CookieConsent";
import { NavbarFooter } from "@/components/NavbarFooter";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="min-h-screen md:pl-72 flex flex-col justify-between">
        <div>
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
          {children}
        </div>
        <NavbarFooter />
      </main>
      <CookieConsent />
    </div>
  );
}
