"use client";

import { useEffect } from "react";

import useAnimate from "@/services/layout/useAnimate";

export default function Formtest() {
  const animate = useAnimate();

  useEffect(() => {
    animate?.initAnimate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTest1(e: any) {
    e.preventDefault();
    animate.foldAnimate(
      ".folder_container1",
      "folder_container2",
      "folder_container3",
      "folder_container4",
      "folder_container5"
    );
  }

  return (
    <div className="bg-base-200 h-4/5 w-11/12">
      asdfasfdas
      <div className="w-full folder_container1">
        <div className="w-full h-full folder_container2">
          <div className="card folder_container3 h-[calc(100vh_-_80px)]">
            <div className="card folder_container4">
              <div className="card folder_container5 ">
                <form className="animate_form">
                  <div className="grid">
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="grid">
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="grid">
                    <button className="btn btn-primary" onClick={handleTest1}>
                      테스트
                    </button>
                  </div>
                  <div className="grid">
                    <button className="btn btn-primary" onClick={handleTest1}>
                      테스트2
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
