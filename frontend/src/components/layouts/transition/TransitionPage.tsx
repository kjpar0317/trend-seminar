"use client";

import { useEffect } from "react";

import useAnimate from "@/services/layout/useAnimate";

export default function TransitionPage() {
  const animate = useAnimate();

  useEffect(() => {
    animate.animatePageIn("#transition-element");
  }, [animate]);

  return (
    <div
      id="transition-element"
      className="w-screen h-screen bg-primary/60 to-white fixed top-0 left-0"
    ></div>
  );
}
