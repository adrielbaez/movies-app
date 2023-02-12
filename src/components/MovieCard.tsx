import React from "react";
import Image from "next/image";
import { Movie } from "../interfaces";
import Link from "next/link";

interface ItemGaleryProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: ItemGaleryProps) => {
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <>
      <Link href={`/movie/${movie.id}`}>
        <div
          style={{
            width: 300,
            height: 450,
            position: "relative",
            cursor: "pointer",
          }}
          className="rounded-xl overflow-hidden hover:scale-105  transition-all duration-300 ease-in-out   "
        >
          <Image src={uri} alt={movie.title} width={300} height={450} />
        </div>
      </Link>
    </>
  );
};
