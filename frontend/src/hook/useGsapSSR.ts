import type { useGSAPConfig, ContextSafeFunc } from "@gsap/react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import usePrefersReducedMotion from "./usePrefersReducedMotion";

type ContextFunc = (context: gsap.Context, contextSafe?: ContextSafeFunc) => Function | any | void;

export default function useGSapSSR(ssrEffect: ContextFunc | undefined, clientEffect: ContextFunc | undefined, config: useGSAPConfig | unknown[] | undefined) {
    const prefersReducedMotion = usePrefersReducedMotion();
    gsap.registerPlugin(useGSAP);

    useGSAP(() => {
        debugger;
        if (prefersReducedMotion) {
            ssrEffect;
        }
        clientEffect;
    }, config);
}