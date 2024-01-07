"use client";

import type { ReactElement } from "react";

import { Layout, Model } from "flexlayout-react";

import "flexlayout-react/style/light.css";

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

export default function Profile({
  params: { profile },
}: {
  params: { profile: string[] };
}): ReactElement {
  const factory = (node: any) => {
    var component = node.getComponent();

    if (component === "button") {
      return <button>{node.getName()}</button>;
    } else if (component === "div") {
      return (
        <>
          <div>username: {profile[0]}</div>
          <div>email: {profile[1]}</div>
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
