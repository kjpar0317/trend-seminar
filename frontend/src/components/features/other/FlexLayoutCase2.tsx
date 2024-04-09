"use client";

import type { ReactElement } from "react";
import type { TabNode } from "flexlayout-react";

import { Layout, Model } from "flexlayout-react";

import Dashboard from "@/components/features/default/Dashboard";
import Profile from "@/components/features/default/Profile";
import Monitoring from "@/components/features/default/Monitoring";
import FormTest from "@/components/features/default/FormTest";
import AlarmOpenStack from "@/components/features/alarm/AlarmOpenStack";

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
      selected: 0,
      location: "bottom",
      children: [
        {
          type: "tab",
          id: "#1-1",
          name: "VMWare",
          component: <AlarmOpenStack />,
          enableClose: false,
        },
        {
          type: "tab",
          id: "#1-2",
          name: "OpenStack",
          component: "grid",
          enableClose: false,
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
                id: "#1",
                name: "Dashboard",
                component: <Dashboard />,
              },
              {
                type: "tab",
                id: "#2",
                name: "Profile",
                component: <Profile username="test1" email="test2" />,
              },
              {
                type: "tab",
                id: "#3",
                name: "Monitoring",
                component: <Monitoring />,
              },
              {
                type: "tab",
                id: "#4",
                name: "FormTest",
                component: <FormTest />,
              },
            ],
          },
        ],
      },
    ],
  },
};

const model = Model.fromJson(json);

export default function FlexLayoutCase2(): ReactElement {
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
