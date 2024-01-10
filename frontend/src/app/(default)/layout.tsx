"use client";

import type { ReactElement, ReactNode } from "react";
import type { ILayoutStore } from "@/services/layout/useLayout";

import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "@/components/layout/error/ErrorFallback";
import useLayout from "@/services/layout/useLayout";
import Sidebar from "@/components/layout/common/default/Sidebar";
import Navigation from "@/components/layout/common/default/Navigation";
import Footer from "@/components/layout/common/default/Footer";

interface IRootProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: Readonly<IRootProps>): ReactElement {
  const layout: ILayoutStore = useLayout();

  return (
    <ErrorBoundary
        FallbackComponent={ErrorFallback}
      >
      <div className="min-h-screen bg-base-200 w-full" data-theme={layout.theme}>
        <Sidebar />
        <div className="p-4 xl:ml-80">
          <Navigation />
          <div className="w-full h-[calc(100vh_-_130px)] overflow-y-auto">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </ErrorBoundary>
  );
}
