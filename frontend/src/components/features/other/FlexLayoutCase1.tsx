"use client";

import type { ReactElement } from "react";
import type { TabNode } from "flexlayout-react";

import { Layout, Model } from "flexlayout-react";

import Dashboard from "@/components/features/default/Dashboard";
import Profile from "@/components/features/default/Profile";
import Monitoring from "@/components/features/default/Monitoring";
import FormTest from "@/components/features/default/FormTest";

const json: any = {
  global: {
    tabEnableFloat: true,
    // tabSetMinWidth: 100,
    // tabSetMinHeight: 100,
    // borderMinSize: 100,
  },
  borders: [
    {
      type: "border",
      selected: 1,
      location: "bottom",
      children: [
        {
          type: "tab",
          id: "#1-1",
          name: "VMWare",
          component: "grid",
          // enableClose: false
        },
        {
          type: "tab",
          id: "#1-2",
          name: "OpenStack",
          component: "grid",
        },
      ],
    },
  ],
  layout: {
    type: "row",
    id: "#5",
    children: [
      {
        type: "row",
        id: "#52",
        weight: 25,
        children: [
          {
            type: "row",
            id: "#88",
            weight: 50,
            children: [
              {
                type: "tabset",
                id: "#9",
                weight: 50,
                selected: 0,
                children: [
                  {
                    type: "tab",
                    id: "#10",
                    name: "Dashboard",
                    component: <Dashboard />,
                  },
                  {
                    type: "tab",
                    id: "#12",
                    name: "Monitoring",
                    component: <Monitoring />,
                  },
                ],
              },
              {
                type: "tabset",
                id: "#87",
                weight: 50,
                selected: 0,
                children: [
                  {
                    type: "tab",
                    id: "#36",
                    name: "FormTest1",
                    component: <FormTest />,
                  },
                  {
                    type: "tab",
                    id: "#91",
                    name: "FormTest2",
                    component: <FormTest />,
                  },
                ],
              },
            ],
          },
          {
            type: "tabset",
            id: "#51",
            weight: 50,
            selected: 0,
            children: [
              {
                type: "tab",
                id: "#35",
                name: "Profile 1",
                component: <Profile username="test1" email="test1" />,
              },
              {
                type: "tab",
                id: "#55",
                name: "Profile 2",
                component: <Profile username="test2" email="test2" />,
              },
            ],
            active: true,
          },
        ],
      },
    ],
  },
};

const model = Model.fromJson(json);

export default function FlexLayoutCase1(): ReactElement {
  const factory = (node: TabNode) => {
    const component: string | undefined = node.getComponent();

    if (component === "button") {
      return <button>{node.getName()}</button>;
    } else if (component === "div") {
      return <div>Wow!</div>;
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
