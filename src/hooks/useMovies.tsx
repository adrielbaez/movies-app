import { useEffect, useState } from "react";
import { movieDB } from "../api";
import { Movie, MovieDBResponse } from "../interfaces";

interface MoviesSate {
  nowPlaying: Movie[];
  populars: Movie[];
  upcoming: Movie[];
  topRated: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [moviesState, setMoviesState] = useState<MoviesSate>({
    nowPlaying: [],
    populars: [],
    upcoming: [],
    topRated: [],
  });

  const getMovies = async () => {
    const nowPlayingPromise = movieDB.get<MovieDBResponse>("/now_playing");
    const popularsPromise = movieDB.get<MovieDBResponse>("/popular");
    const upcomingPromise = movieDB.get<MovieDBResponse>("/upcoming");
    const topRatedPromise = movieDB.get<MovieDBResponse>("/top_rated");

    const response = await Promise.all([
      nowPlayingPromise,
      popularsPromise,
      upcomingPromise,
      topRatedPromise,
    ]);

    setMoviesState({
      nowPlaying: response[0].data.results,
      populars: response[1].data.results,
      upcoming: response[2].data.results,
      topRated: response[3].data.results,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    //now_playing
    getMovies();
  }, []);

  return { ...moviesState, isLoading };
};
