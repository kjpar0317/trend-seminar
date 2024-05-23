import React from "react";
import gsap, { CSSPlugin } from "gsap";

gsap.registerPlugin(CSSPlugin);

export default function useGsapToggle(options: gsap.TweenVars) {
  const [open, set] = React.useState(false);
  const [ref, setRef] = React.useState({});
  const { current: tl } = React.useRef(gsap.timeline({ paused: true }));

  React.useEffect(() => {
    tl.to(ref, options);
  }, [ref, options, tl]);

  const animate = React.useCallback(() => {
    open ? tl.reverse() : tl.play();
    set(!open);
  }, [open, tl]);

  return [setRef, animate];
}
