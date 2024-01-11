"use client";

import type { ReactElement } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import { useEffect } from "react";
import useAnimate from "@/services/layout/useAnimate";
import GridCard from "@/components/cards/demo/GridCard";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Monitoring(): ReactElement {
    const animate = useAnimate();
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

  useEffect(() => {
    animate?.initAnimate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick(selector: string) {
    animate.bounceAnimate?.(
      `div ${selector}`,
      "card ring ring-red-500 bg-base-100 h-full z-[9000]"
    );
  }

  return (
    <>
      <div className="w-full space-x-2">
        <button
          className="btn btn-primary"
          onClick={() => handleClick(".test1")}
        >
          Test1
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleClick(".test2")}
        >
          Test2
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleClick(".test3")}
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
            <div key={layout.i}>
              <GridCard id={layout.i} />
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    </>
  );
}