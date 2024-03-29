import type { ReactElement } from "react";
import Image from "next/image";

interface IGridCard {
  id: string;
}

export default function GridCard({ id }: Readonly<IGridCard>): ReactElement {
  return (
    <div className={`${id} card bg-base-100 shadow-xl h-full animate_div`}>
      <figure>
        <Image
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Movie"
          width={250}
          height={160}
          sizes="(max-width: 768px) 250vw,
                (max-width: 1200px) 260vw,
                270vw"
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{id} Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
