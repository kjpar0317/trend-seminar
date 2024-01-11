"use client";

import type { ReactElement } from "react";

import Sidebar from "@/components/layouts/commons/other/Sidebar";
import Navigation from "@/components/layouts/commons/other/Navigation";
import Footer from "@/components/layouts/commons/other/Footer";

import "flexlayout-react/style/light.css";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: ReactElement;
}>) {
  return (
    <div className="min-h-screen bg-gray-50/50 w-full">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <Navigation />
        <div className="mt-12 min-h-[calc(100vh_-_180px)]">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
