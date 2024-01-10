"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";

import useAnimate from "@/services/layout/useAnimate";

export default function Formtest() {
  const animate = useAnimate();
  const [timeline, setTimeline] = useState<gsap.core.Timeline>(
    gsap.timeline({ defaults: { ease: "power2.inOut" } })
  );

  useEffect(() => {
    animate?.initAnimate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOpen(e: any) {
    e.preventDefault();
    setTimeline(
      animate.openFoldAnimate(
        timeline,
        "#authOverlay",
        "#second",
        "#third",
        "#fourth"
      )
    );
  }

  function handleClose() {
    animate.reverseAnimate(timeline);
  }

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-cyan-400 to-cyan-700">
      <form className="animate_form">
        <div className="grid">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="grid">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="grid">
          <button className="btn btn-primary">테스트</button>
        </div>
        <div className="grid">
          <button className="btn btn-primary">테스트2</button>
        </div>
      </form>
      <button className="btn btn-primary" onClick={handleOpen}>
        Open
      </button>
      <div
        id="authOverlay"
        className="fixed z-10 left-0 top-0 h-full w-full flex items-center justify-center py-3 px-2 overflow-y-auto bg-white/80 backdrop-blur-sm scale-y-0 -translate-x-full opacity-0 origin-center"
      >
        <div
          id="fourth"
          className="bg-white/0 max-w-sm m-auto mb-0 sm:mb-auto p-3 border border-white/0 rounded-2xl shadow-sm"
        >
          <div
            id="second"
            className="bg-white p-4 sm:p-8 w-full rounded-xl shadow-sm scale-y-0 opacity-0"
          >
            <div id="third" className="relative scale-y-0 opacity-0">
              <h1 className="text-cyan-400 text-3xl font-bold mb-4 text-center">
                Hello!
              </h1>

              <p className="text-center text-neutral-500/80 mb-4">
                I am a modal open and close animation made with GSAP and
                tailwindcss.
              </p>

              <div className="text-center">
                <button
                  onClick={handleClose}
                  className="bg-neutral-100 text-neutral-400 font-semibold text-xl rounded-md border-b-[3px] px-3 py-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
