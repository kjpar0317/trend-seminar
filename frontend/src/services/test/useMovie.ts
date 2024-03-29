
import useSWR from 'swr';

import { getFetch } from "@/util/fetch-utils";

interface IUseMovie {
    movie_list: Array<IMovie>;
    originalPath: string;
    w500Path: string;
}

export default function useMovie(): IUseMovie {
    /*
    https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
    https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
    https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
    */
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/popular?api_key=22478a88b22311a5249584b2c23d6a3d`, getFetch);

    return { 
        movie_list: data?.results || [], 
        originalPath: "https://image.tmdb.org/t/p/original/",
        w500Path: "https://image.tmdb.org/t/p/w500/"
    };
}