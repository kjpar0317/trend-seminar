"use client";

import type { ReactElement } from "react";
import type { TabNode } from "flexlayout-react";

import { Layout, Model } from "flexlayout-react";

import Dashboard from "@/components/services/default/Dashboard";
import Profile from "@/components/services/default/Profile";
import FormTest from "@/components/services/default/FormTest";

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
            component: <Profile username="dsfasdf" email="dddd" />,
          },
          {
            type: "tab",
            name: "Two",
            component: <Dashboard />,
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
            component: <FormTest />,
          },
        ],
      },
    ],
  },
};

const model = Model.fromJson(json);

export default function FlexLayoutTest(): ReactElement {
    const factory = (node: TabNode) => {
    const component: string | undefined = node.getComponent();

    if (component === "button") {
        return <button>{node.getName()}</button>;
    } else if (component === "div") {
        return (
        <div>Wow!</div>
        );
    } else {
        return component;
    }
    };

    return (
        <div className="relative flex h-screen">
            <Layout model={model} factory={factory} />
        </div>
    );
}