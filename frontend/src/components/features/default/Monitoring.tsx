"use client";

import type { ReactElement } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import useAnimate from "@/services/layout/useAnimate";
import GridCard from "@/components/cards/demo/GridCard";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Monitoring(): ReactElement {
  const { initAnimate, bounceAnimate } = useAnimate();
  const layouts: ILayout[] = [
    { i: "test1", x: 0, y: 0, w: 3, h: 2 },
    { i: "test2", x: 3, y: 0, w: 6, h: 2 },
    { i: "test3", x: 9, y: 0, w: 3, h: 2 },
    { i: "test4", x: 0, y: 3, w: 6, h: 2 },
    { i: "test5", x: 3, y: 3, w: 3, h: 2 },
    { i: "test6", x: 6, y: 3, w: 3, h: 2 },
    { i: "test7", x: 0, y: 6, w: 3, h: 2 },
    { i: "test8", x: 3, y: 6, w: 3, h: 2 },
    { i: "test9", x: 6, y: 6, w: 3, h: 2 },
  ];

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    initAnimate?.();
  }, []);

  function handleClick(selector: string) {
    bounceAnimate?.(`div ${selector}`, "card ring ring-red-500 h-full");
  }

  return (
    <>
      <div className="w-full space-x-2">
        <button
          className="btn btn-primary"
          onClick={() => handleClick("#grid_test1")}
        >
          Test1
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleClick("#grid_test2")}
        >
          Test2
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleClick("#grid_test3")}
        >
          Test3
        </button>
      </div>
      <div className="w-full">
        <ResponsiveReactGridLayout
          className="layout"
          layouts={{
            lg: layouts,
            md: layouts,
            sm: layouts,
            xs: layouts,
            xxs: layouts,
          }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {layouts.map((layout: ILayout) => (
            <div id={`grid_${layout.i}`} key={layout.i}>
              <GridCard id={layout.i} />
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    </>
  );
}
