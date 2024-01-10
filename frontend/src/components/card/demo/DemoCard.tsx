import type { ReactElement, MouseEvent } from "react";
import Image from "next/image";
import useLayout from "@/services/layout/useLayout";

interface IDemoCard {
  onClick?: (e: any) => void;
}

export default function DemoCard(props: IDemoCard): ReactElement {
  const layout = useLayout();

  function handleClick(e: MouseEvent<HTMLElement>) {
    props.onClick?.(e);
  }

  return (
    <div className={`${layout.getAnimateInitParams()} card card-side bg-base-100 shadow-xl animate_div`}>
      <figure>
        <Image
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          alt="Movie"
          width={300}
          height={200}
          priority={true}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleClick}>
            Watch
          </button>
        </div>
      </div>
    </div>
  );
}
