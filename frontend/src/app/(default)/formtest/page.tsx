"use client";

import { useLayoutEffect } from "react";

import useLayout from "@/services/layout/useLayout";
import useAnimate from "@/services/layout/useAnimate";

export default function Formtest() {
    const layout = useLayout();
    const animate = useAnimate();

    useLayoutEffect(() => {
        animate.initAnimate();
    }, [animate]);

    function handleTest1(e: any) {
        e.preventDefault();
        animate.foldAnimate(".folder_container1", "folder_container2", "folder_container3", "folder_container4", "folder_container5")
    }

    return (
        <div className="relative bg-base-200 h-4/5 w-11/12">
            asdfasfdas
            <div className="absoulute w-full folder_container1 flex">
                <div className="w-full h-full folder_container2">
                    <div className="card folder_container3 h-[calc(100vh_-_80px)]">
                        <div className="card folder_container4">
                            <div className="card folder_container5 ">
                                <form className={`${layout.getAnimateInitParams()} animate_form`}>
                                    <div className="flex">
                                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="flex">
                                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="flex">
                                        <button className="btn btn-primary" onClick={handleTest1}>테스트</button>
                                    </div>
                                    <div className="flex">
                                        <button className="btn btn-primary" onClick={handleTest1}>테스트2</button>
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