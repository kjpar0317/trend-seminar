import type { ReactElement } from "react";

import Sidebar from "@/components/layout/common/Sidebar";
import Navigation from "@/components/layout/common/Navigation";
import Footer from "@/components/layout/common/Footer";

import "flexlayout-react/style/light.css";

export default function DefaultLayout({
  children,
}: {
  children: ReactElement;
}) {
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
