"use client";

import type { ReactElement } from "react";

import useMovie from "@/services/movie/useMovie";
import MovieCard from "@/components/cards/movie/MovieCard";

interface IProfile {
  username: string;
  email: string;
}

export default function Profile({
  username,
  email,
}: Readonly<IProfile>): ReactElement {
  const movie = useMovie();

  return (
    <>
      <div>username: {username}</div>
      <div>email: {email}</div>
      <div className="space-y-2 ml-2 mr-2">
        {movie.movie_list.map((movie: IMovie, index: number) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </>
  );
}
