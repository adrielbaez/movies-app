import { NextPage } from "next";
import React from "react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  showNav?: boolean;
  movieId: number;
}

const Layout: NextPage<LayoutProps> = ({
  children,
  showNav = true,
  movieId,
}) => {
  return (
    <div className="bg-black min-h-screen">
      {showNav && <NavBar movieId={movieId} />}
      <>{children}</>
      <Footer />
    </div>
  );
};

export default Layout;
