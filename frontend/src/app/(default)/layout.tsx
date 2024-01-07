"use client";

import type { ReactElement } from "react";
import type { ILayoutStore } from "@/services/layout/useLayout";

import useLayout from "@/services/layout/useLayout";
import Sidebar from "@/components/layout/common/default/Sidebar";
import Navigation from "@/components/layout/common/default/Navigation";
import Footer from "@/components/layout/common/default/Footer";

import "flexlayout-react/style/light.css";

export default function DefaultLayout({
  children,
}: {
  children: ReactElement;
}) {
  const layout: ILayoutStore = useLayout();

  return (
    <div className="min-h-screen bg-base-300 w-full" data-theme={layout.theme}>
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <Navigation />
        <div className="mt-12 min-h-[calc(100vh_-_180px)]">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
