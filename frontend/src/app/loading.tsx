"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import usePrefersReducedMotion from "@/hook/usePrefersReducedMotion";

export default function Loading() {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(["svg"], {
          position: "absolute",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
        });
        gsap.set([container], {
          position: "absolute",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
        });
      }
      let t1: gsap.core.Timeline = gsap.timeline({ repeat: -1 });

      t1.set("#outline", {
        drawSVG: "0% 0%",
      });
      t1.to("#outline", {
        duration: 0.2,
        drawSVG: "11% 25%",
        ease: "linear",
      });
      t1.to("#outline", {
        duration: 0.5,
        drawSVG: "35% 70%",
        ease: "linear",
      });
      t1.to("#outline", {
        duration: 0.9,
        drawSVG: "99% 100%",
        ease: "linear",
      });
    },
    { scope: container }
  );
  return (
    <div className="content w-full h-full">
      <div ref={container}>
        <svg
          width="300px"
          height="200px"
          viewBox="0 0 187.3 93.7"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            // style="-webkit-filter:url(#f2)"
            stroke="#ededed"
            id="outline"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="
				M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1
				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
          />
          <path
            id="outline-bg"
            opacity="0.05"
            fill="none"
            stroke="#ededed"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="
				M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1
				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
          />
        </svg>
      </div>
    </div>
  );
}
