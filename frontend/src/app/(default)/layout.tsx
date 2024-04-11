"use client";

import type { ReactElement, ReactNode } from "react";
import type { IThemeStore } from "@/services/layout/useTheme";

import { usePathname } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import useTheme from "@/services/layout/useTheme";
import ErrorFallback from "@/components/layouts/error/ErrorFallback";
import Sidebar from "@/components/layouts/commons/default/Sidebar";
import Navigation from "@/components/layouts/commons/default/Navigation";
import Footer from "@/components/layouts/commons/default/Footer";
import TransitionPage from "@/components/layouts/transition/TransitionPage";

interface IRootProps {
  children: ReactNode;
}

export default function DefaultLayout({
  children,
}: Readonly<IRootProps>): ReactElement {
  // const { data: session } = useSession()
  const theme: IThemeStore = useTheme();
  const pathname = usePathname();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        className="min-h-screen bg-base-200 w-full"
        data-theme={theme.themePattern}
      >
        <Sidebar />
        <div className="p-4 xl:ml-80">
          <Navigation />
          <div className="w-full h-[calc(100vh_-_130px)] overflow-y-auto">
            {children}
          </div>
          <Footer />
          <TransitionPage key={pathname} />
        </div>
      </div>
    </ErrorBoundary>
  );
}
