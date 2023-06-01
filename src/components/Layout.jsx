import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Outlet>{children}</Outlet>
    </>
  );
}

export default Layout;
