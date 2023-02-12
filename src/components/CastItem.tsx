import Image from "next/image";
import React from "react";
import { Cast } from "../interfaces/CreditsResponse";

interface CastItemProps {
  cast: Cast;
}

export const CastItem = ({ cast }: CastItemProps) => {
  const uri = `https://image.tmdb.org/t/p/w500${cast.profile_path}`;
  return (
    <>
      <div
        style={{
          position: "relative",
          cursor: "pointer",
        }}
        className="rounded-xl overflow-hidden hover:scale-105  transition-all duration-300 ease-in-out   "
      >
        <Image src={uri} alt={cast.name} width={200} height={250} />

        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
        {/* display name */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col justify-end px-2">
          <h1 className="text-sm text-white">{cast.name}</h1>
          <p className="text-xs text-gray-300">{cast.character}</p>
        </div>
      </div>
    </>
  );
};
