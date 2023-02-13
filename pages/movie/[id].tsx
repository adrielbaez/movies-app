import React, { useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Carousel from "better-react-carousel";
import { movieDB } from "@/src/api";
import { GetServerSideProps } from "next";
import { Movie, MovieDBResponse, MovieFull } from "@/src/interfaces";
import { Cast, CreditsResponse } from "@/src/interfaces/CreditsResponse";
import { CastItem } from "@/src/components/CastItem";
import YouTube from "react-youtube";
import Image from "next/image";
import { MovieCard } from "@/src/components/MovieCard";
import { Layout } from "@/src/components/layout";
import { RiMovie2Fill, RiStarSFill } from "react-icons/ri";
import { Modal } from "@/src/components/Modal";
import Link from "next/link";

interface MovieDetailsPageProps {
  movie: MovieFull;
  cast: Cast[];
}

const MovieDetailsPage: NextPage<MovieDetailsPageProps> = ({ movie, cast }) => {
  const router = useRouter();
  const { id } = router.query;
  const [videoKey, setVideoKey] = useState("");

  const getTrailer = async () => {
    const { data } = await movieDB.get(`/${id}/videos`);
    console.log(data.results.find((video: any) => video.type === "Trailer"));

    setVideoKey(
      data.results.find((video: any) => video.type === "Trailer").key
    );
  };

  React.useEffect(() => {
    getTrailer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
      playsinline: 0,
      iv_load_policy: 3,
    },
  };

  return (
    <Layout
      movieId={+id!}
      showNav={false}
      title={movie.title}
      description={movie.overview}
    >
      <>
        <Link
          href="/"
          className="bg-black/10 absolute z-10 top-15 right-5 h-12 w-12 text-xs font-semibold rounded-full text-white inline-flex items-center justify-center outline-none focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        {/* image */}
        <div className="top-0 h-full w-full ">
          <div className="relative xl:left-14 m-auto xl:w-[90%] xl:h-[90vh] md:h-[60vh] h-[35vh] mb-30 xl:mb-44">
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
              width={3840}
              height={2160}
              className="w-full h-full"
              priority
            />
            <div className="h-full w-3/4 absolute bottom-0 left-0 bg-gradient-to-r from-black to-transparent"></div>
            <div className="h-[30vh] w-full absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent"></div>
          </div>

          <div className="xl:absolute xl:bottom-0  xl:left-20 xl:w-2/4 ">
            <div className="flex flex-col justify-center items-center px-5 xl:flex-row xl:items-end">
              <MovieCard movie={movie} />
              {/* Movie title */}
              <div className="flex-grow flex-col justify-center ml-10 ">
                <div className="flex ">
                  {" "}
                  <RiMovie2Fill className="text-5xl text-white" />
                  <h1 className="text-white text-4xl font-bold">
                    {movie.title}
                  </h1>
                </div>
                {/* genres */}
                <div className="flex mt-5">
                  {" "}
                  <h1 className="text-white text-2xl font-light">
                    {movie.genres
                      ?.slice(0, 3)
                      .map((genre) => genre.name)
                      .join(" | ")}
                  </h1>
                </div>
                {/* rated movie */}
                <div className="flex ">
                  <div className="flex gap-2">
                    <div className="flex items-center">
                      <h3 className="text-white text-2xl font-light">
                        Vote Average: {movie.vote_average.toFixed(1)}
                      </h3>

                      <h1 className="text-white text-2xl font-light ">/10</h1>
                    </div>
                  </div>
                </div>
                {/* overview */}
                <div className="flex mt-5">
                  <h3 className="text-white text-2xl font-light">
                    {movie.overview}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "80%",
            height: "100%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <iframe
            src="https://www.youtube.com/embed/o5F8MOz_IDw"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            width={"100%"}
            height={"100%"} // 16:9
          ></iframe> */}
          <YouTube
            videoId={videoKey}
            opts={opts}
            className="[&_iframe]:w-full [&_iframe]:h-full [&_iframe]:aspect-video h-[30vh] xl:h-[70vh]"
          />
        </div>

        <div className="mt-10 mb-10   flex w-full px-4  text-white text-sm font-semibold ">
          <h1 className="text-white text-4xl font-bold">Cast</h1>
        </div>

        <Carousel cols={8} rows={1} gap={10} loop>
          {cast.map((cast: Cast) => (
            <Carousel.Item key={cast.id}>
              <CastItem cast={cast} />
            </Carousel.Item>
          ))}
        </Carousel>
      </>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const movieDetailsPromise = movieDB.get<MovieFull>(`/${id}`);
  const castPromise = movieDB.get<CreditsResponse>(`/${id}/credits`);

  const [movieDetailsResponse, castResponse] = await Promise.all([
    movieDetailsPromise,
    castPromise,
  ]);

  if (!movieDetailsResponse.data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      movie: movieDetailsResponse.data,
      cast: castResponse.data.cast,
    },
  };
};

export default MovieDetailsPage;
