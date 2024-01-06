'use client'

import { useRef, MutableRefObject, ReactElement, MouseEventHandler } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home(): ReactElement {
  let timeline: gsap.core.Timeline= gsap.timeline({repeat: 0});
  const containerRef: MutableRefObject<HTMLDivElement| null> = useRef(null);
  const { contextSafe } = useGSAP((): void => { containerRef });

  const handleClick = contextSafe((): void => {
    timeline
      .to(".card", { rotation: "+=180", stagger: 0.5})
      .to(".card", { x: 100, stagger: 0.5 });

    // timeline.reverse();
  }) as MouseEventHandler<HTMLButtonElement>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div ref={containerRef} className="container gap-5 space-y-10">
          <div className="card card-side bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
            <div className="card-body">
              <h2 className="card-title">New movie is released!</h2>
              <p>Click the button to watch on Jetflix app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleClick}>Watch</button>
              </div>
            </div>
          </div>
          <div className="card card-side bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
            <div className="card-body">
              <h2 className="card-title">New movie is released!</h2>
              <p>Click the button to watch on Jetflix app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleClick}>Watch</button>
              </div>
            </div>
          </div>       
          <div className="card card-side bg-base-100 shadow-xl">
          <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
            <div className="card-body">
              <h2 className="card-title">New movie is released!</h2>
              <p>Click the button to watch on Jetflix app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleClick}>Watch</button>
              </div>
            </div>
          </div>               
        </div>
      </div>
    </main>
  )
}
