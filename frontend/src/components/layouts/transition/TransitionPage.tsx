"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import useAnimate from "@/services/layout/useAnimate";

export default function TransitionPage() {
  const animate = useAnimate();

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    animate.animatePageIn("#transition-element");
  }, [animate]);

  return (
    <div
      id="transition-element"
      className="w-screen h-screen bg-primary/60 to-white fixed top-0 left-0"
    ></div>
  );
}
