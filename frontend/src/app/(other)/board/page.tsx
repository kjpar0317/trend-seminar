"use client";

import type { ReactElement } from "react";
import { Layout, Model } from "flexlayout-react";

const json: any = {
  global: {
    tabEnableFloat: true,
    // tabSetMinWidth: 100,
    // tabSetMinHeight: 100,
    // borderMinSize: 100,
  },
  borders: [],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: "One",
            component: "div",
          },
          {
            type: "tab",
            name: "Two",
            component: "button",
          },
        ],
      },
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: "Two",
            component: "button",
          },
        ],
      },
    ],
  },
};

const model = Model.fromJson(json);

export default function Board(): ReactElement {
  const factory = (node: any) => {
    var component = node.getComponent();

    if (component === "button") {
      return <button>{node.getName()}</button>;
    } else if (component === "div") {
      return (
        <>
          <div>Wow!</div>
        </>
      );
    }
  };

  return (
    <>
      <div className="relative flex h-screen">
        <Layout model={model} factory={factory} />
      </div>
    </>
  );
}
