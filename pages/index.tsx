import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";
import { movieDB } from "@/src/api";
import { Movie, MovieDBResponse } from "@/src/interfaces";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Loader } from "@/src/components/loaders/Loader";

interface Props {
  popularMovies: Movie[];
  nowPlaying: Movie[];
  upcoming: Movie[];
  topRated: Movie[];
}

// imports lazy components
const Hero = lazy(() => import("@/src/components/Hero"));
const Layout = lazy(() => import("@/src/components/layout/Layout"));
const Galery = lazy(() => import("@/src/components/Galery"));

const Home = ({ popularMovies, nowPlaying, upcoming, topRated }: Props) => {
  const [randomMovie, setrandomMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setrandomMovie(
      popularMovies[Math.floor(Math.random() * popularMovies.length)]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!randomMovie) {
    return <Loader />;
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Layout
          movieId={
            popularMovies[Math.floor(Math.random() * popularMovies.length)].id
          }
        >
          <Hero heroMovie={randomMovie} />
          <Galery movies={popularMovies} title="Trailers" />
          <Galery movies={upcoming} title="Upcoming" />
          <Galery movies={topRated} title="Top Rated" />
          <Galery movies={nowPlaying} title="Now Playing" />
        </Layout>
      </Suspense>
    </>
  );
};

export default Home;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

  return {
    props: {
      popularMovies: response[1].data.results,
      nowPlaying: response[0].data.results,
      upcoming: response[2].data.results,
      topRated: response[3].data.results,
    },
  };
};
