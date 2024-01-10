import type { IThemeStore } from "./useTheme";

import { useCallback } from "react";
import { gsap } from "gsap";
import { range } from "lodash-es";

import useTheme from "./useTheme";

type TEasePower1 = "power1.out" | "power1.inOut" | "power1.in";
type TEasePower2 = "power2.out" | "power2.inOut" | "power2.in";
type TEasePower3 = "power3.out" | "power3.inOut" | "power3.in";
type TEasePower4 = "power4.out" | "power4.inOut" | "power4.in";
type TEaseBack = "back.out" | "back.inOut" | "back.in";
type TEaseBounce = "bounce.out" | "bounce.inOut" | "bounce.in";
type TEaseCirc = "circ.out" | "circ.inOut" | "circ.in";
type TEaseElastic = "elastic.out" | "elastic.inOut" | "elastic.in";
type TEaseExpo = "expo.out" | "expo.inOut" | "expo.in";
type TEaseSinc = "sinc.out" | "sinc.inOut" | "sinc.in";

export type TEaseType = TEasePower1 | TEasePower2 | TEasePower3 | TEasePower4 | TEaseBack | TEaseBounce | TEaseCirc | TEaseElastic | TEaseExpo | TEaseSinc | "steps";
export type TDivAction = "fade" | "transform" | "shuffle";
export type TInputAction = "fade" | "transform";

export interface IAnimateStore {
    initAnimate: () => void;
    bounceAnimate: (selector: string, optionClsName?: string | undefined) => void;
    openFoldAnimate: (timeline: gsap.core.Timeline, ...targets: string[]) => gsap.core.Timeline;
    reverseAnimate: (timeline: gsap.core.Timeline) => void;
} 

export default function useAnimate(): IAnimateStore {
    const theme: IThemeStore = useTheme();

    const initAnimate = useCallback(() => {
        if(theme.animate) {
            const animateDiv = document.querySelectorAll(".animate_div");
            const animateForm = document.querySelectorAll(".animate_form");

            if(animateDiv.length > 0) {
                if(theme.divAnimate === "fade") {
                    gsap.fromTo(".animate_div", { opacity: 0 }, { ease: "power3.inOut", duration: 0.6, scale: 1, stagger: 0.3, opacity: 1  });
                } else if(theme.divAnimate === "transform") {
                    gsap.fromTo(".animate_div", { scale: 0.5, opacity: 0 }, { ease: "power3.inOut", duration: 0.4, scale: 1, stagger: 0.2, opacity: 1  });
                } else if(theme.divAnimate === "shuffle") {
                    range(0, animateDiv.length).forEach((index: number) => {
                        if(index % 4 === 0) {
                            gsap.fromTo(animateDiv[index], { x: -400, opacity: 0 }, { x: 0, ease: "power3.inOut", duration: 1.2, opacity: 1 });
                        } else if(index % 4 === 1) {
                            gsap.fromTo(animateDiv[index], { y: -400, opacity: 0 }, { y: 0, ease: "power3.inOut", duration: 1.2, opacity: 1 });
                        } else if(index % 4 === 2) {
                            gsap.fromTo(animateDiv[index], { x: 400, opacity: 0 }, { x: 0, ease: "power3.inOut", duration: 1.2, opacity: 1 });
                        } else if(index % 4 === 3) {
                            gsap.fromTo(animateDiv[index], { y: 400, opacity: 0 }, { y: 0, ease: "power3.inOut", duration: 1.2, opacity: 1 });
                        }
                    });
                }
            }
            if(animateForm.length > 0) {
                if(theme.formAnimate === "fade") {
                    gsap.fromTo(".animate_form", { opacity: 0 }, { ease: "power3.inOut", duration: 1, scale: 1, stagger: 0.3, opacity: 1  });
                } else if(theme.formAnimate === "transform") {
                    gsap.fromTo(".animate_form", { scale: 0.5, opacity: 0 }, { ease: "power3.inOut", duration: 1, scale: 1, stagger: 0.3, opacity: 1  });
                } else if(theme.formAnimate === "elevator") {
                    gsap.to(".animate_form", { opacity: 1});
                    gsap.fromTo(".animate_form .input", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.3 })
                    gsap.fromTo(".animate_form .btn", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.3 });
                }
            }
        }
    }, [theme]);

    function bounceAnimate(selector: string, optionClsName: string | undefined) {
        if(!theme.animate) return;
        const bounceTimeline = gsap.timeline({});
        bounceTimeline.to(selector, { scale: 1.2, ease: "bounce", opacity: 1, yoyo: true, repeat: 5, className: optionClsName
            , onComplete: function () {
                this.progress(0).kill();
            }
        });
    }
    
    function openFoldAnimate(timeline: gsap.core.Timeline, ...targets: string[]): gsap.core.Timeline {
        range(0, targets.length).forEach((f: number) => {
            if(f === 0) {
                timeline
                    .to(targets[f], {scaleY: 0.01, x: 1, opacity: 1, display: "flex", duration: 0.4})
                    .to(targets[f], {scaleY: 1, background: "rgba(255,255,255,0.16)", duration: 0.6});
            } else if(f === 1) {
                timeline.to(targets[f], {scaleY: 1, opacity: 1, duration: 0.6}, "-=0.4")
            } else if(f === 2) {
                timeline.to(targets[f], {scaleY: 1, opacity: 1, duration: 0.4}, "-=0.2")
            } else if(f === 3) {
                timeline.to(targets[f], { background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.3)", duration: 0.8}, "-=0.4");
            }
        });

        return timeline;
    }

    function reverseAnimate(timeline: gsap.core.Timeline) {
        timeline.reverse();
    }

    return {
        initAnimate,
        bounceAnimate,
        openFoldAnimate,
        reverseAnimate
    };
}