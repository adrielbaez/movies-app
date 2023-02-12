import Link from "next/link";
import React from "react";

interface NavBarProps {
  movieId: number;
}

export const NavBar = ({ movieId }: NavBarProps) => {
  return (
    <div className="relative z-20 py-5 px-5 lg:px-16 flex w-full gap-x-5 text-white text-sm font-semibold justify-between">
      <div className="flex gap-x-5">
        <Link href="/">Home</Link>
        <>
          <Link href={`/movie/${movieId}`}>Trailers</Link>
        </>
      </div>
    </div>
  );
};
