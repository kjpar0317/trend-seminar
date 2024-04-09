import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import GSAPProvider from "@/components/provider/GSAPProvider";

import "./globals.css";
import "@/assets/style/transition.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        data-theme="light"
        suppressHydrationWarning
      >
        <SessionProvider>
          <GSAPProvider>{children}</GSAPProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
