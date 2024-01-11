import type { IThemeStore } from "./useTheme";

import { useCallback } from "react";
import { gsap } from "gsap";
import { range } from "lodash-es";

import useTheme from "./useTheme";

export interface IAnimateStore {
    initAnimate: () => void;
    animateDivArea: (timeline: gsap.core.Timeline, target: string, action: TDivAction) => gsap.core.Timeline;
    animateFormArea: (timeline: gsap.core.Timeline, target: string, action: TFormAction) => gsap.core.Timeline;
    bounceAnimate: (selector: string, optionClsName?: string | undefined) => void;
    openFoldAnimate: (timeline: gsap.core.Timeline, ...targets: string[]) => gsap.core.Timeline;
    reverseAnimate: (timeline: gsap.core.Timeline) => void;
} 

export default function useAnimate(): IAnimateStore {
    const theme: IThemeStore = useTheme();

    const initAnimate = useCallback((): void => {
        if(theme.animate) {
            let rootTimeline = gsap.timeline({});
            animateDivArea(rootTimeline, ".animate_div", theme.divAnimate ?? "none");
            animateFormArea(rootTimeline, ".animate_form", theme.formAnimate ?? "none");
        }
    }, [theme]);

    function animateDivArea(timeline: gsap.core.Timeline, target: string, action: TDivAction): gsap.core.Timeline {
        const animateDiv = document.querySelectorAll(target);

        if(animateDiv.length > 0) {
            if(action === "fade") {
                timeline.fromTo(".animate_div", { opacity: 0 }, { ease: "power3.inOut", duration: 0.6, scale: 1, stagger: 0.3, opacity: 1  });
            } else if(action === "transform") {
                timeline.fromTo(".animate_div", { scale: 0.5, opacity: 0 }, { ease: "power3.inOut", duration: 0.4, scale: 1, stagger: 0.2, opacity: 1  });
            } else if(action === "shuffle") {
                range(0, animateDiv.length).forEach((index: number) => {
                    if(index % 4 === 0) {
                        timeline.fromTo(animateDiv[index], { x: -400, opacity: 0 }, { x: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 });
                    } else if(index % 4 === 1) {
                        timeline.fromTo(animateDiv[index], { y: -400, opacity: 0 }, { y: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 });
                    } else if(index % 4 === 2) {
                        timeline.fromTo(animateDiv[index], { x: 400, opacity: 0 }, { x: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 });
                    } else if(index % 4 === 3) {
                        timeline.fromTo(animateDiv[index], { y: 400, opacity: 0 }, { y: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 });
                    }
                });
            }
        }
        return timeline;
    }

    function animateFormArea(timeline: gsap.core.Timeline, target: string, action: TFormAction): gsap.core.Timeline {
        const animateForm = document.querySelectorAll(target);

        if(animateForm.length > 0) {
            if(action === "fade") {
                timeline.fromTo(target, { opacity: 0 }, { ease: "power3.inOut", duration: 1, scale: 1, stagger: 0.3, opacity: 1  });
            } else if(action === "transform") {
                timeline.fromTo(target, { scale: 0.5, opacity: 0 }, { ease: "power3.inOut", duration: 1, scale: 1, stagger: 0.3, opacity: 1  });
            } else if(action === "elevator") {
                timeline.to(target, { opacity: 1, duration: 0.2 })
                    .fromTo(`${target} .input`, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.3 })
                    .fromTo(`${target} .btn`, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.3 });
            }
        }
        return timeline;
    }

    function bounceAnimate(selector: string, optionClsName: string | undefined) {
        if(!theme.animate) return;
        const bounceTimeline = gsap.timeline({});
        bounceTimeline.to(selector, { scale: 1.05, ease: "bounce", yoyo: true, repeat: 5, background: "oklch(var(--er)/var(--tw-bg-opacity))",className: optionClsName
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
        animateDivArea,
        animateFormArea,
        bounceAnimate,
        openFoldAnimate,
        reverseAnimate
    };
}