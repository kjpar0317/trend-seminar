import type { ReactElement } from "react";
import Image from "next/image";

import useMovie from "@/services/test/useMovie";

interface IMovieCard {
  movie: IMovie;
}

export default function DemoCard({ movie }: Readonly<IMovieCard>): ReactElement {
    const theme = useMovie();

  return (
    <div className={`card card-side bg-base-100 shadow-xl animate_div`}>
      <figure>
        <img
          src={`${theme.w500Path}${movie.backdrop_path}`}
          alt="Movie"
          width="50"
          className="h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{movie.title}</h2>
        <p className="eclipse">{movie.overview}</p>
        <div className="card-actions justify-end">
            {movie.release_date}
        </div>
      </div>
    </div>
  );
}
