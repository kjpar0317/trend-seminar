"use client";

import type { ReactElement } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import useAnimate from "@/services/layout/useAnimate";
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
  const { initAnimate } = useAnimate();
  const movie = useMovie();

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    initAnimate?.();
  }, []);

  return (
    <>
      <div>username: {username}</div>
      <div>email: {email}</div>
      <div className="space-y-2 ml-2 mr-2 animate-div">
        {movie.movie_list.map((movie: IMovie, index: number) => (
          <MovieCard key={`${movie.id}`} movie={movie} />
        ))}
      </div>
    </>
  );
}
