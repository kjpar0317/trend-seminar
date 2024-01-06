"use client";

import type { ReactElement } from "react";
import { useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";

import DemoCard from "@/components/card/DemoCard";

export default function Dashboard(): ReactElement {
  const [toggle, setToggle] = useState(false);
  const [timeline, setTimeline] = useState<gsap.core.Timeline>();
  // const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  // const { contextSafe } = useGSAP((): void => {
  //   containerRef;
  // });

  // const handleClick = contextSafe((): void => {
  //   if (!toggle) {
  //     const rotateTimeline: gsap.core.Timeline = gsap.timeline({ repeat: 0 });
  //     rotateTimeline
  //       .to(".card", { rotation: "+=180", stagger: 0.5 })
  //       .to(".card", { x: 100, stagger: 0.5 });
  //     setTimeline(rotateTimeline);
  //   } else {
  //     timeline?.reverse();
  //   }
  //   setToggle(!toggle);
  // }) as MouseEventHandler<HTMLButtonElement>;

  useLayoutEffect(() => {
    gsap.fromTo(
      ".card",
      { width: 0, opacity: 0.1, duration: 1.5 },
      { width: "100%", opacity: 1, stagger: 0.5 }
    );
  }, []);

  function handleClick() {
    if (!toggle) {
      const rotateTimeline: gsap.core.Timeline = gsap.timeline({ repeat: 0 });
      rotateTimeline
        .to(".card", { rotation: "+=180", stagger: 0.5 })
        .to(".card", { x: 100, stagger: 0.5 });
      setTimeline(rotateTimeline);
    } else {
      timeline?.reverse();
    }
    setToggle(!toggle);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="container gap-5 space-y-10">
          <DemoCard onClick={handleClick} />
          <DemoCard onClick={handleClick} />
          <DemoCard onClick={handleClick} />
        </div>
      </div>
    </main>
  );
}
