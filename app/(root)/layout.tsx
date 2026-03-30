import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <MobileNav />

        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="rounded-xl border border-white/10 bg-black/90 shadow-inner backdrop-blur-md">
            <div className="wrapper p-4 sm:p-6 md:p-8">{children}</div>
          </div>
        </div>
      </div>

      <Toaster />
    </main>
  );
};

export default Layout;
