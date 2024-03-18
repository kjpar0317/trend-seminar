
import useSWR from 'swr';

import { getFetch } from "@/util/fetch-utils";

export default function useMovie() {
    const { data: movie_list } = useSWR(`https://api.themoviedb.org/3/movie/popular?api_key=22478a88b22311a5249584b2c23d6a3d`, getFetch);

    return { movie_list };
}