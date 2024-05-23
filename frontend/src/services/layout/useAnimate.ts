import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { IThemeStore } from "./useTheme";

import { useCallback } from "react";
import { gsap } from "gsap";
import { range } from "lodash-es";

import useTheme from "./useTheme";

export interface IAnimateStore {
  initAnimate: () => void;
  animateDivArea: (
    timeline: gsap.core.Timeline,
    target: string,
    action: TDivAction
  ) => gsap.core.Timeline;
  animateFormArea: (
    timeline: gsap.core.Timeline,
    target: string,
    action: TFormAction
  ) => gsap.core.Timeline;
  bounceAnimate: (selector: string, optionClsName?: string | undefined) => void;
  openFoldAnimate: (
    timeline: gsap.core.Timeline,
    area?: string | undefined
  ) => gsap.core.Timeline;
  reverseAnimate: (timeline: gsap.core.Timeline) => void;
  animatePageIn: (selector: string) => void;
  animatePageOut: (
    selector: string,
    href: string,
    router: AppRouterInstance
  ) => void;
}

export default function useAnimate(): IAnimateStore {
  const theme: IThemeStore = useTheme();

  const initAnimate = useCallback((): void => {
    if (theme.animate) {
      let rootTimeline = gsap.timeline({});
      animateDivArea(rootTimeline, ".animate_div", theme.divAnimate ?? "none");
      animateFormArea(
        rootTimeline,
        ".animate_form",
        theme.formAnimate ?? "none"
      );
    }
  }, [theme]);

  function animateDivArea(
    timeline: gsap.core.Timeline,
    target: string,
    action: TDivAction
  ): gsap.core.Timeline {
    const animateDiv = document.querySelectorAll(".animate_div");
    const targetDiv = document.querySelectorAll(target);

    if (targetDiv.length > 0) {
      // 초기화
      // timeline.progress(0).kill();

      if (action === "fade" && animateDiv.length > 0) {
        timeline.fromTo(
          animateDiv,
          { opacity: 0 },
          {
            ease: "power3.inOut",
            duration: 0.6,
            scale: 1,
            stagger: 0.3,
            opacity: 1,
          }
        );
      } else if (action === "transform" && animateDiv.length > 0) {
        timeline.fromTo(
          animateDiv,
          { scale: 0.5, opacity: 0 },
          {
            ease: "power3.inOut",
            duration: 0.4,
            scale: 1,
            stagger: 0.2,
            opacity: 1,
          }
        );
      } else if (action === "shuffle") {
        range(0, targetDiv.length).forEach((index: number) => {
          if (index % 4 === 0) {
            timeline.fromTo(
              targetDiv[index],
              { x: -400, opacity: 0 },
              { x: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 }
            );
          } else if (index % 4 === 1) {
            timeline.fromTo(
              targetDiv[index],
              { y: -400, opacity: 0 },
              { y: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 }
            );
          } else if (index % 4 === 2) {
            timeline.fromTo(
              targetDiv[index],
              { x: 400, opacity: 0 },
              { x: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 }
            );
          } else if (index % 4 === 3) {
            timeline.fromTo(
              targetDiv[index],
              { y: 400, opacity: 0 },
              { y: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 }
            );
          }
        });
      }
      // timeline.progress(0).kill();
    }
    return timeline;
  }

  function animateFormArea(
    timeline: gsap.core.Timeline,
    target: string,
    action: TFormAction
  ): gsap.core.Timeline {
    const animateForm = document.querySelectorAll(target);

    if (animateForm.length > 0) {
      if (action === "fade") {
        timeline.fromTo(
          animateForm,
          { opacity: 0 },
          {
            ease: "power3.inOut",
            duration: 1,
            scale: 1,
            stagger: 0.3,
            opacity: 1,
          }
        );
      } else if (action === "transform") {
        timeline.fromTo(
          animateForm,
          { scale: 0.5, opacity: 0 },
          {
            ease: "power3.inOut",
            duration: 1,
            scale: 1,
            stagger: 0.3,
            opacity: 1,
          }
        );
      } else if (action === "elevator") {
        const inputElem = document.querySelectorAll(`${target} .input`);
        const btnElem = document.querySelectorAll(`${target} .btn`);
        timeline.to(animateForm, { opacity: 1, duration: 0.2 });

        if (inputElem.length > 0) {
          timeline.fromTo(
            inputElem,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.3 }
          );
        }
        if (btnElem.length > 0) {
          timeline.fromTo(
            btnElem,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.3 }
          );
        }
      }
    }
    return timeline;
  }

  function bounceAnimate(selector: string, optionClsName: string | undefined) {
    if (!theme.animate) return;
    const bounceTimeline = gsap.timeline({});
    bounceTimeline.to(selector, {
      scale: 1.05,
      ease: "bounce",
      yoyo: true,
      repeat: 5,
      background: "oklch(var(--er)/var(--tw-bg-opacity))",
      className: optionClsName,
      onComplete: function () {
        this.progress(0).kill();
      },
    });
  }

  function openFoldAnimate(
    timeline: gsap.core.Timeline,
    area?: string | undefined
  ): gsap.core.Timeline {
    timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    if (area) {
      const folderForm = document.querySelectorAll(area);
      timeline
        .to(folderForm, {
          scaleY: 0.01,
          x: 1,
          opacity: 1,
          display: "flex",
          duration: 0.4,
        })
        .to(folderForm, { opacity: 0, duration: 0.2 });
    } else {
      const folderForm = document.querySelectorAll("#main_gsap");
      timeline
        .to(folderForm, {
          scaleY: 0.01,
          x: 1,
          opacity: 1,
          display: "flex",
          duration: 0.4,
        })
        .to(folderForm, { opacity: 0, duration: 0.2 });
    }

    return timeline;
  }

  function reverseAnimate(timeline: gsap.core.Timeline) {
    timeline.reverse();
  }

  function animatePageIn(element: string) {
    const animateDiv = document.querySelectorAll(element);

    if (animateDiv) {
      const tl = gsap.timeline();
      tl.set(animateDiv, {
        xPercent: 0,
      })
        .to(animateDiv, {
          xPercent: 100,
          duration: 0.8,
        })
        .to(
          animateDiv,
          {
            borderTopLeftRadius: "50vh",
            borderBottomLeftRadius: "50vh",
            duration: 0.4,
          },
          "<"
        );
    }
  }

  function animatePageOut(
    element: string,
    href: string,
    router: AppRouterInstance
  ) {
    const animateDiv = document.querySelectorAll(element);

    if (animateDiv) {
      const tl = gsap.timeline();

      tl.set(animateDiv, {
        xPercent: -100,
        borderTopRightRadius: "50vh",
        borderBottomRightRadius: "50vh",
        borderTopLeftRadius: "0",
        borderBottomLeftRadius: "0",
      })
        .to(animateDiv, {
          xPercent: 0,
          duration: 0.8,
          onComplete: () => {
            router.push(href);
          },
        })
        .to(
          animateDiv,
          {
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
            duration: 0.4,
          },
          "<"
        );
    }
  }

  return {
    initAnimate,
    animateDivArea,
    animateFormArea,
    bounceAnimate,
    openFoldAnimate,
    reverseAnimate,
    animatePageIn,
    animatePageOut,
  };
}
