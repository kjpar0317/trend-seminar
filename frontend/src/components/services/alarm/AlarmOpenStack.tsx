import { ReactElement, useEffect } from "react";

import { gsap } from "gsap";
import { random } from "lodash-es";

export default function AlarmOpenStack(): ReactElement {
  function handleGo() {
    const randDur: number = random(1.2, 2.0);
    const randStag: number = random(0.5, 1.2);

    gsap.from(".acolumns", {
      x: -1500,
      duration: randDur,
      autoAlpha: 1,
      stagger: {
        amount: randStag,
        from: "random",
      },
      repeat: -1,
    });
  }

  return (
    <>
      <div className={"flex"}>
        <button className={"btn btn-primary"} onClick={handleGo}>
          GO~GO~GO~
        </button>
      </div>
      <div id={"test"} className={"relative flex grid-cols-1 float-right"}>
        <div className={"absolute top-1 acolumns bg-amber-100 right-20"}>
          adfdafd1
        </div>
        <div className={"absolute top-4 acolumns bg-amber-200 right-20"}>
          adfdafd2
        </div>
        <div className={"absolute top-8 acolumns bg-amber-300 right-20"}>
          adfdafd3
        </div>
        <div className={"absolute top-12 acolumns bg-amber-400 right-20"}>
          adfdafd4
        </div>
        <div className={"absolute top-16 acolumns bg-amber-500 right-20"}>
          adfdafd5
        </div>
      </div>
    </>
  );
}
