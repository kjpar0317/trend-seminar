import type { ReactElement } from "react";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isNumber } from "lodash-es";

import { numberWithCommas } from "@/util/comm-utils";

interface INumberTyphography {
  value: string;
  className: string;
}

export default function NumberTypography({
  value,
  className,
}: Readonly<INumberTyphography>): ReactElement {
  const [text, setText] = useState<string>(value);
  const container = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.from(container.current, {
      textContent: 0,
      duration: 4,
      ease: "power1.in",
      snap: { textContent: 1 },
      stagger: {
        each: 1.0,
        onUpdate: function () {
          if (isNumber(value)) {
            setText(numberWithCommas(Math.ceil(Number(value))));
          }
        },
      },
    });
  }, [{ scope: container }, value]);

  return (
    <div ref={container} className={className}>
      {text}
    </div>
  );
}
