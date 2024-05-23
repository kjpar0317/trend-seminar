import { ReactElement, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { range, random } from "lodash-es";

export default function AlarmOpenStack(): ReactElement {
  const container = useRef(null);
  const [dup, setDup] = useState<number>(1);

  useGSAP(
    () => {
      const randDur: number = random(1.5, 2.5);
      const randStag: number = random(1, 5);
      const bounceTimeline = gsap.timeline({});

      bounceTimeline.clear();
      bounceTimeline.from(".acolumns", {
        x: -1500,
        duration: randDur,
        autoAlpha: 1,
        stagger: {
          amount: randStag,
          from: "random",
        },
        repeat: -1,
      });
      // bounceTimeline.to(".acolumns", { delay: 2 }, 1);
    },
    { scope: container, dependencies: [dup] }
  );

  function handleIncrement() {
    setDup(dup + 1);
  }

  function handleDecrement() {
    setDup(dup - 1);
  }

  return (
    <>
      <div className={"flex"}>
        <button className={"btn btn-primary"} onClick={handleIncrement}>
          increase
        </button>
        <button className={"btn btn-primary"} onClick={handleDecrement}>
          decrease
        </button>
      </div>
      <div ref={container} className={"relative flex grid-cols-1 float-right"}>
        {range(0, dup, 1).map((index) => (
          <div key={index}>
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
        ))}
      </div>
    </>
  );
}
