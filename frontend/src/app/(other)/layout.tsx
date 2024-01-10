"use client";

import type { ReactElement } from "react";

import { useLayoutEffect } from "react";

import useAnimate from "@/services/layout/useAnimate";
import Sidebar from "@/components/layout/common/other/Sidebar";
import Navigation from "@/components/layout/common/other/Navigation";
import Footer from "@/components/layout/common/other/Footer";

import "flexlayout-react/style/light.css";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: ReactElement;
}>) {
  const animate = useAnimate();

  useLayoutEffect(() => {
    animate.initAnimate();
  }, [animate]);

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
