"use client";

import type { ReactElement, MouseEvent } from "react";

import { useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";

import useAnimate from "@/services/layout/useAnimate";
import GSAPModal from "@/components/frameworks/modal/GSAPModal";

export default function FormTest(): ReactElement {
  const animate = useAnimate();
  const [open, setOpen] = useState<boolean>(false);
  const [timeline, setTimeline] = useState<gsap.core.Timeline>(
    gsap.timeline({})
  );

  useEffect(() => {
    animate?.initAnimate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOpenScreen1(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setTimeline(animate.openFoldAnimate(timeline));
  }

  function handleOpenScreen2(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setTimeline(animate.openFoldAnimate(timeline, "#form_test"));
  }

  function handleRecover(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    animate.reverseAnimate(timeline);
  }

  const handleCloseScreen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <button className="btn btn-primary" onClick={handleRecover}>
        복원
      </button>
      <div
        id="form_test"
        className="w-full h-screen bg-gradient-to-tr from-cyan-400 to-cyan-700"
      >
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
            <button className="btn btn-primary" onClick={handleOpenScreen1}>
              테스트
            </button>
          </div>
          <div className="grid">
            <button className="btn btn-primary" onClick={handleOpenScreen2}>
              테스트2
            </button>
          </div>
        </form>
        <button className="btn btn-primary" onClick={handleOpen}>
          Open
        </button>
      </div>
      <GSAPModal open={open} onClose={handleClose}>
        <div className="w-[800px] h-[800px]">
          <h1 className="text-cyan-400 text-3xl font-bold mb-4 text-center">
            Hello!
          </h1>
          <p className="text-center text-neutral-500/80 mb-4">
            I am a modal open and close animation made with GSAP and
            tailwindcss.
          </p>
        </div>
      </GSAPModal>
    </div>
  );
}
