import type { ILayoutStore } from "./useLayout";

import { gsap } from "gsap";
import { range } from "lodash-es";

import useLayout from "./useLayout";

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
    rootMarkAnimate: () => void;
    initAnimate: () => void;
    bounceAnimate: (selector: string, optionClsName?: string | undefined) => void;
    foldAnimate: (...targets: string[]) => void;
} 

export default function useAnimate(): IAnimateStore {
    const layout: ILayoutStore = useLayout();

    function rootMarkAnimate() {
        if(layout.animate) return "opacity-0"; 
    }

    function initAnimate() {
        if(layout.animate) {
            const animateDiv = document.querySelectorAll(".animate_div");
            const animateForm = document.querySelectorAll(".animate_form");

            if(animateDiv.length > 0) {
                if(layout.divAnimate === "fade") {
                    gsap.fromTo(".animate_div", { opacity: 0 }, { ease: "power3.inOut", duration: 0.6, scale: 1, stagger: 0.3, opacity: 1  });
                } else if(layout.divAnimate === "transform") {
                    gsap.fromTo(".animate_div", { scale: 0.5, opacity: 0 }, { ease: "power3.inOut", duration: 0.4, scale: 1, stagger: 0.2, opacity: 1  });
                } else if(layout.divAnimate === "shuffle") {
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
                if(layout.formAnimate === "fade") {
                    gsap.fromTo(".animate_form", { opacity: 0 }, { ease: "power3.inOut", duration: 1, scale: 1, stagger: 0.3, opacity: 1  });
                } else if(layout.formAnimate === "transform") {
                    gsap.fromTo(".animate_form", { scale: 0.5, opacity: 0 }, { ease: "power3.inOut", duration: 1, scale: 1, stagger: 0.3, opacity: 1  });
                } else if(layout.formAnimate === "elevator") {
                    gsap.to(".animate_form", { opacity: 1});
                    gsap.fromTo(".animate_form .input", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.3 })
                    gsap.fromTo(".animate_form .btn", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.3 });
                }
            }
        }
    }

    function bounceAnimate(selector: string, optionClsName: string | undefined) {
        if(!layout.animate) return;
        const bounceTimeline = gsap.timeline({});
        bounceTimeline.to(selector, { scale: 1.2, ease: "bounce", opacity: 1, yoyo: true, repeat: 5, className: optionClsName
            , onComplete: function () {
                this.progress(0).kill();
            }
        });
    }
    
    function foldAnimate(...targets: string[]) {
        const foldTimeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });

        range(0, targets.length).forEach((f: number) => {
            if(f === 0) {
                foldTimeline.to(targets[f], { scaleY: 0.01, x: 1, opacity: 1, display: "flex", duration: 0.4 })
            } else if(f === 1) {
                foldTimeline.to(targets[f], { scaleY: 1, background: "bg-white", duration: 0.6 });
            } else if(f === 2) {
                foldTimeline.to(targets[f], { scaleY: 1, opacity: 1, duration: 0.6 }, "-=0.4")
            } else if(f === 3) {
                foldTimeline.to(targets[f], { scaleY: 1, opacity: 1, duration: 0.4 }, "-=0.2")
            } else if(f === 4) {
                foldTimeline.to(targets[f], { background: "bg-white", border: "1px solid border-white"});
            }
        });

        foldTimeline.to(targets[0], { opacity: 0, duration: 0.1 });
    }

    return {
        rootMarkAnimate,
        initAnimate,
        bounceAnimate,
        foldAnimate
    };
}