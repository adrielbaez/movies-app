import React from "react";
import Carousel from "better-react-carousel";
import { MovieCard } from "./MovieCard";
import { Movie } from "../interfaces";

interface GaleryProps {
  movies: Movie[];
  title: string;
}

const Galery = ({ movies, title }: GaleryProps) => {
  return (
    <>
      <div className="mt-10 mb-10   flex w-full px-4  text-white text-sm font-semibold ">
        <h1 className="text-white text-4xl font-bold">{title}</h1>
      </div>

      <Carousel cols={6} rows={1} gap={10} loop>
        {movies.map((movie: Movie) => (
          <Carousel.Item key={movie.id}>
            <MovieCard movie={movie} />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default Galery;
