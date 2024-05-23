"use client";

import type { ReactElement } from "react";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import useAnimate from "@/services/layout/useAnimate";
import DemoCard from "@/components/cards/demo/DemoCard";
import { useSession } from "next-auth/react";

export default function Dashboard(): ReactElement {
  const { initAnimate } = useAnimate();
  const { data: session } = useSession();
  const [toggle, setToggle] = useState<boolean>(false);
  const [timeline, setTimeline] = useState<gsap.core.Timeline>();
  const container = useRef(null);

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

  const { contextSafe } = useGSAP(
    () => {
      initAnimate?.();
    },
    { scope: container }
  );

  const handleClick = contextSafe(() => {
    console.log(session?.user);

    if (!toggle) {
      const rotateTimeline: gsap.core.Timeline = gsap.timeline({});
      rotateTimeline
        .to(".card", { rotation: "+=180", stagger: 0.5 })
        .to(".card", { x: 100, stagger: 0.5 });
      setTimeline(rotateTimeline);
    } else {
      timeline?.reverse();
    }
    setToggle(!toggle);
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div ref={container} className="container gap-5 space-y-10">
          <DemoCard onClick={handleClick} />
          <DemoCard onClick={handleClick} />
          <DemoCard onClick={handleClick} />
        </div>
      </div>
    </main>
  );
}
