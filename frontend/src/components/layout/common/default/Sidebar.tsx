"use client";

import type { ReactElement } from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { includes } from "lodash-es";

import { ARR_MENUS } from "@/constants/menu";

import "@/assets/styles/layout.css";

export default function Sidebar(): ReactElement {
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState<string>("");

  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname]);

  return (
    <aside className="bg-primary -translate-x-80 glass fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
      <div className="relative border-b border-primary-content/60">
        <a className="flex items-center gap-4 py-6 px-8" href="#/">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-primary-content">
            샘플
          </h6>
        </a>
        <button
          className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
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
              className="h-5 w-5 text-primary-content"
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
          {ARR_MENUS.map((m: IMenu) => (
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
            <Link href="/board">
              <button
                className={`${
                  (currentRoute == "/board" && "default_button_active") ||
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
                  other
                </p>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
