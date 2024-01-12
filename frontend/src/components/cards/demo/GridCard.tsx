import type { ReactElement } from "react";

interface IGridCard {
  id: string;
}

export default function GridCard({ id }: Readonly<IGridCard>): ReactElement {
  return (
    <div className={`${id} card bg-base-100 shadow-xl h-full animate_div`}>
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
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
