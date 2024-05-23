"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import useAnimate from "@/services/layout/useAnimate";

export default function TransitionPage() {
  const { animatePageIn } = useAnimate();

  useGSAP(
    () => {
      animatePageIn("#transition-element");
    },
    { dependencies: [animatePageIn] }
  );

  return (
    <div
      id="transition-element"
      className="w-screen h-screen bg-primary/60 to-white fixed top-0 left-0"
    ></div>
  );
}
