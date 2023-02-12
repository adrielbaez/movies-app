import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  showNav?: boolean;
  movieId: number;
  title?: string;
  description?: string;
}

const Layout: NextPage<LayoutProps> = ({
  children,
  showNav = true,
  movieId,
  title,
  description,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Movies - App"}</title>
        <meta name="author" content="Adriel Baez" />
        <meta name="description" content={description} />
        <meta name="keywords" content={`${title || ""}, movies`} />
      </Head>
      <div className="bg-black min-h-screen">
        {showNav && <NavBar movieId={movieId} />}
        <>{children}</>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
