import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Outlet>{children}</Outlet>
      <footer className="bg-black p-4 text-center text-white">
        All rights reserved lol
      </footer>
    </>
  );
}

export default Layout;
