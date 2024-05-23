"use client";
import type { ReactNode } from "react";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hook/usePrefersReducedMotion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedContent({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(container.current, { y: 0 });
        return;
      }

      gsap.fromTo(
        container.current,
        { y: 100 },
        {
          y: 0,
          ease: "power2.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom-=40%",
            toggleActions: "play pause resume reverse",
          },
        }
      );
    },
    { scope: container }
  );

  return <div ref={container}>{children}</div>;
}
