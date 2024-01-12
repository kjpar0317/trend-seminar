"use client";

import type { ReactElement, ReactNode } from "react";

import useTheme from "@/services/layout/useTheme";

export default function GSAPProvider({children}: Readonly<{ children: ReactNode; }>): ReactElement {
    useTheme();

    return (
        <div id="main_gsap">
            {children}
        </div>
    );
}