"use client";

import type { ReactElement } from "react";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "@/assets/style/notfound.css";

export default function Custom404(): ReactElement {
  const container = useRef(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { duration: 1 } });
      timeline
        .fromTo(
          ".search",
          { x: "-200px", y: "100px", opacity: 0 },
          {
            x: "200px",
            y: "-100px",
            rotate: 40,
            opacity: 1,
            yoyo: true,
          }
        )
        .to("h1", { y: "0", ease: "bounce", opacity: 1 })
        .to(".search", { x: "0", y: "0", rotate: 0, ease: "bounce" })
        .fromTo("h2", { opacity: 0 }, { opacity: 1, delay: 0.2 });
    },
    { scope: container }
  );

  return (
    <main>
      <div ref={container} className="container">
        <span className="material-symbols-outlined search">search</span>
        <h1 className="h1">404</h1>
        <h2>Not Found</h2>
      </div>
    </main>
  );
}
