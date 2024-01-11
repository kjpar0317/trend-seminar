"use client";

import type { ReactElement } from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { includes } from "lodash-es";

import { ARR_MENU } from "@/constant/menu";

import "@/assets/style/layout.css";

export default function Sidebar(): ReactElement {
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState<string>("");

  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname]);

  return (
    <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
      <div className="relative border-b border-white/20">
        <a className="flex items-center gap-4 py-6 px-8" href="#/">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            샘플
          </h6>
        </a>
        <button
          className="middle text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          type="button"
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
        </button>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {ARR_MENU.map((m: IMenu) => (
            <li key={m.url}>
              <Link aria-current="page" href={m.url}>
                <button
                  className={`${
                    (includes(m.url, currentRoute) && "default_button_active") ||
                    "default_button_noactive"
                  }`}
                  type="button"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                    dangerouslySetInnerHTML={{__html: m.icon}} />
                  <p className="block antialiased text-primary-content leading-relaxed text-inherit font-medium capitalize">
                    {m.name}
                  </p>
                </button>
              </Link>
            </li>
          ))}         
        </ul>
        <ul className="mb-4 flex flex-col gap-1">
          <li>
            <Link href="/case1">
              <button
                className={`${
                  (currentRoute == "/case1" && "default_button_active") ||
                  "default_button_noactive"
                }`}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  strokeWidth="3"
                  className="h-6 w-6 text-blue-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="block antialiased text-primary-content leading-relaxed text-inherit font-medium capitalize">
                  Case1
                </p>
              </button>
            </Link>
          </li>
          <li>
            <Link href="/case2">
              <button
                className={`${
                  (currentRoute == "/case2" && "default_button_active") ||
                  "default_button_noactive"
                }`}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
                <p className="block antialiased text-primary-content leading-relaxed text-inherit font-medium capitalize">
                  Case2
                </p>
              </button>
            </Link>
          </li>          
        </ul>
      </div>
    </aside>
  );
}
