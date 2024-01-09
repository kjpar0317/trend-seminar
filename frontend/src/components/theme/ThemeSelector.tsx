"use client";

import type { ReactElement } from "react";
import type { ILayoutStore } from "@/services/layout/useLayout";

import { ARR_THEME } from "@/constants/theme";
import useLayout from "@/services/layout/useLayout";

export default function ThemeSelector(): ReactElement {
  const layout: ILayoutStore = useLayout();

  function handleTheme(val: string) {
    layout.setTheme?.(val);
  }

  return (
    <div
      title="Change Theme"
      className="dropdown dropdown-end bg-base-200 text-base-content"
    >
      <div tabIndex={0} className="gap-1 normal-case btn btn-ghost">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          ></path>
        </svg>
        <span className="hidden md:inline">Theme</span>
        <svg
          width="12px"
          height="12px"
          className="hidden w-3 h-3 ml-1 fill-current opacity-60 sm:inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <div className="z-[3000] dropdown-content rounded-t-box rounded-b-box top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl">
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          {ARR_THEME.map((m: string, index: number) => (
            <div
              key={m}
              role="button"
              tabIndex={index}
              className="overflow-hidden rounded-lg outline outline-2 outline-offset-2 outline-base-content"
              data-set-theme="theme"
              data-act-classname="outline"
              onClick={() => handleTheme(m)}
              onFocus={() => {}}
            >
              <div
                data-theme={m}
                className="w-full font-sans cursor-pointer bg-base-100 text-base-content"
              >
                <div className="grid grid-cols-5 grid-rows-3">
                  <div className="flex col-span-5 row-span-3 row-start-1 gap-1 px-4 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={`${layout.theme === m ? "" : "invisible" } h-3 w-3 shrink-0"`}>
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                    </svg>
                    <div className="flex-grow text-sm font-bold">        
                      {m}
                    </div>
                    <div className="flex flex-wrap flex-shrink-0 gap-1">
                      <div className="w-2 rounded bg-primary"></div>
                      <div className="w-2 rounded bg-secondary"></div>
                      <div className="w-2 rounded bg-accent"></div>
                      <div className="w-2 rounded bg-neutral"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
